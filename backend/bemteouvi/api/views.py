from rest_framework import viewsets, filters, status, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .filters import MusicaMaisOuvidaFilter
from .models import (
    Album, Musica, Evento, Playlist, Comentario, Curtida, Leilao,
    Lance, Estatistica, Ouvinte, Musico, PlayerCountUsuario
)
from .serializers import (
    AlbumSerializer, MusicaSerializer, EventoSerializer, PlaylistSerializer, ComentarioSerializer, CurtidaSerializer, LeilaoSerializer, LanceSerializer, EstatisticaSerializer, 
    OuvinteSerializer, MusicoSerializer, RegistroSerializer, UserSerializer,
    CustomTokenObtainPairSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import F, Value, Sum, Q
from django.db.models.functions import Coalesce
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import timedelta
import os
import tempfile
from mutagen.wave import WAVE
from mutagen.mp3 import MP3

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import (AlbumPermission, MusicaPermission, EventoPermission, PlaylistPermission, ComentarioPermission, CurtidaPermission, LeilaoPermission, LancePermission, EstatisticaPermission)
from .observers import (
    MusicaSubject, 
    EstatisticaGlobalObserver, 
    HistoricoUsuarioObserver
)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def registro_view(request):
    serializer = RegistroSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Usuário registrado com sucesso!',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def usuario_atual_view(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated, AlbumPermission]


    @action(detail=True, methods=['get'])
    def musicas(self, request, pk=None):
        musicas = Musica.objects.filter(album_id=pk)
        serializer = MusicaSerializer(musicas, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def musicos(self, request, pk=None):
        musicos = Musico.objects.filter(album=pk)
        serializer = MusicoSerializer(musicos, many=True)
        return Response(serializer.data)


class MusicaViewSet(viewsets.ModelViewSet):
    queryset = Musica.objects.all()
    serializer_class = MusicaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['titulo', 'album__musicos__nome_artistico']
    permission_classes = [IsAuthenticated, MusicaPermission]  # default para métodos protegidos

    def get_permissions(self):
        # libera qualquer visitante para GET
        if self.request.method in ['GET', 'OPTIONS', 'HEAD']:
            return [AllowAny()]
        return [perm() for perm in self.permission_classes]

    def perform_create(self, serializer):
        """
        Extrai automaticamente a duração do arquivo de áudio antes de salvar
        """
        # Extrair arquivo de áudio do request antes de salvar
        arquivo_audio = self.request.FILES.get('audio_file')
        duracao = timedelta(seconds=0)  # valor padrão
        
        if arquivo_audio:
            try:
                # Salva temporariamente para ler a duração
                # Salvar em arquivo temporário
                with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(arquivo_audio.name)[1]) as tmp_file:
                    for chunk in arquivo_audio.chunks():
                        tmp_file.write(chunk)
                    tmp_path = tmp_file.name
                
                try:
                    # Tenta carregar como MP3
                    try:
                        audio = MP3(tmp_path)
                        duracao_segundos = int(audio.info.length)
                    except:
                        # Se não for MP3, tenta como WAVE
                        try:
                            audio = WAVE(tmp_path)
                            duracao_segundos = int(audio.info.length)
                        except:
                            # Valor padrão se não conseguir extrair
                            duracao_segundos = 0
                    
                    duracao = timedelta(seconds=duracao_segundos)
                finally:
                    # Limpar arquivo temporário
                    if os.path.exists(tmp_path):
                        os.remove(tmp_path)
            except Exception as e:
                print(f"Erro ao extrair duração do áudio: {e}")
                duracao = timedelta(seconds=0)
        
        # Adicionar duração aos dados validados
        serializer.validated_data['duracao'] = duracao
        serializer.save()

    @action(detail=False, methods=['get'])
    def mais_ouvidas(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.annotate(
            total_plays=Coalesce(F('estatisticas__play_count'), Value(0))
        ).order_by('-total_plays')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MusicaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MusicaSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'usuario_id', openapi.IN_QUERY, type=openapi.TYPE_INTEGER,
                description="ID do usuário para filtrar músicas mais ouvidas"
            ),
            openapi.Parameter(
                'search', openapi.IN_QUERY, type=openapi.TYPE_STRING,
                description="Busca de texto (opcional)"
            ),
        ]
    )
    @action(detail=False, methods=['get'], url_path='mais_ouvidas_usuario')
    def mais_ouvidas_usuario(self, request):
        usuario_id = request.query_params.get('usuario_id')
        if not usuario_id:
            return Response({'error': 'Parâmetro usuario_id é obrigatório'}, status=400)

        queryset = Musica.objects.annotate(
            total_plays=Coalesce(
                Sum('players__play_count', filter=Q(players__usuario_id=usuario_id)),
                Value(0)
            )
        ).order_by('-total_plays')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = MusicaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = MusicaSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        operation_description="Registra uma nova reprodução da música, disparando os observadores de estatísticas.",
        responses={
            200: openapi.Response(
                description="Sucesso",
                examples={"application/json": {"status": "Reprodução contabilizada"}}
            ),
            401: "Não autorizado",
            404: "Música não encontrada"
        }
    )
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def play(self, request, pk=None):
        musica = self.get_object()
        user = request.user

        subject = MusicaSubject()
        
        subject.attach(EstatisticaGlobalObserver())
        subject.attach(HistoricoUsuarioObserver())

        subject.notify(musica, user)

        return Response({'status': 'Reprodução contabilizada'}, status=status.HTTP_200_OK)


class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    permission_classes = [IsAuthenticated, EventoPermission]

    def get_permissions(self):
        # libera qualquer visitante para GET
        if self.request.method in ['GET', 'OPTIONS', 'HEAD']:
            return [AllowAny()]
        return [perm() for perm in self.permission_classes]


class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticated, PlaylistPermission]


class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated, ComentarioPermission]

class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer
    permission_classes = [IsAuthenticated, CurtidaPermission]


class LeilaoViewSet(viewsets.ModelViewSet):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer
    permission_classes = [IsAuthenticated, LeilaoPermission]


class LanceViewSet(viewsets.ModelViewSet):
    queryset = Lance.objects.all()
    serializer_class = LanceSerializer
    permission_classes = [IsAuthenticated, LancePermission]


class EstatisticaViewSet(viewsets.ModelViewSet):
    queryset = Estatistica.objects.all()
    serializer_class = EstatisticaSerializer
    permission_classes = [IsAuthenticated, EstatisticaPermission]


class OuvinteViewSet(viewsets.ModelViewSet):
    queryset = Ouvinte.objects.all()
    serializer_class = OuvinteSerializer


class MusicoViewSet(viewsets.ModelViewSet):
    queryset = Musico.objects.all()
    serializer_class = MusicoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome_artistico']

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer