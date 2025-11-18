# from django.shortcuts import render
from rest_framework import viewsets, filters
from .models import Album, Musica, Evento, Playlist, Comentario, Curtida, Leilao, Lance, Estatistica, Ouvinte, Musico
from .serializers import AlbumSerializer, MusicaSerializer, EventoSerializer, PlaylistSerializer, ComentarioSerializer, CurtidaSerializer, LeilaoSerializer, LanceSerializer, EstatisticaSerializer, OuvinteSerializer, MusicoSerializer

from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.db.models import Count, Max, Min, Sum

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer 

    @action(detail=True, methods=['get'])
    def musicas(self, request, pk=None):
        musicas = Musica.objects.filter(album_id=pk)
        serializer = MusicaSerializer(musicas, many=True)
        return Response(serializer.data)

class MusicaViewSet(viewsets.ModelViewSet):
    queryset = Musica.objects.all()
    serializer_class = MusicaSerializer

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer 

class CurtidaViewSet(viewsets.ModelViewSet):
    queryset = Curtida.objects.all()
    serializer_class = CurtidaSerializer

class LeilaoViewSet(viewsets.ModelViewSet):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer

class LanceViewSet(viewsets.ModelViewSet):
    queryset = Lance.objects.all()
    serializer_class = LanceSerializer

class EstatisticaViewSet(viewsets.ModelViewSet):
    queryset = Estatistica.objects.all()
    serializer_class = EstatisticaSerializer

class OuvinteViewSet(viewsets.ModelViewSet):
    queryset = Ouvinte.objects.all()
    serializer_class = OuvinteSerializer

class MusicoViewSet(viewsets.ModelViewSet):
    queryset = Musico.objects.all()
    serializer_class = MusicoSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['^nome_artistico']







