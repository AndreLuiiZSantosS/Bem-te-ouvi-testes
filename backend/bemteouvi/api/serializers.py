from rest_framework import serializers
import json
import datetime
from .models import Album, Musica, Evento, Playlist, Comentario, Curtida, Leilao, Lance, Estatistica, Ouvinte, Musico, User 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AlbumSerializer(serializers.ModelSerializer):
    genero = serializers.CharField(source='genero_musical')
    imagem_capa = serializers.ImageField(source='capa_do_album', required=False)
    musicos = serializers.CharField(write_only=True)
    class Meta:
        model = Album
        fields = [
            'id', 
            'titulo',
            'genero',      
            'imagem_capa', 
            'musicos',     
            'data_de_lancamento'
        ] 
        read_only_fields = ['id', 'data_de_lancamento']
    
    def create(self, validated_data):
        musicos_json_string = validated_data.pop('musicos')
        validated_data['data_de_lancamento'] = datetime.date.today()
        album = Album.objects.create(**validated_data)

        if musicos_json_string:
            musician_ids = json.loads(musicos_json_string)
            musicos_queryset = Musico.objects.filter(id__in=musician_ids)
            album.musicos.set(musicos_queryset)
            
        return album
    
class MusicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musico
        fields = ['id', 'nome_artistico', 'biografia', 'foto_perfil', 'redes_sociais']

class AlbumResumoSerializer(serializers.ModelSerializer):
    imagem_capa = serializers.ImageField(source='capa_do_album', required=False)
    musicos = MusicoSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['id', 'titulo', 'imagem_capa', 'musicos']

class MusicaSerializer(serializers.ModelSerializer):
    audio_file = serializers.FileField(source='arquivo_audio')
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all(), write_only=True)
    album_info = AlbumResumoSerializer(source='album', read_only=True)
    duracao_formatada = serializers.SerializerMethodField()
    autor_melodia = serializers.PrimaryKeyRelatedField(
        queryset=Musico.objects.all(), 
        many=True, 
        required=False
    )
    autor_letra = serializers.PrimaryKeyRelatedField(
        queryset=Musico.objects.all(), 
        many=True, 
        required=False
    )

    class Meta:
        model = Musica
        fields = [
            'id',
            'album',
            'album_info',
            'titulo',
            'letra',
            'genero',
            'audio_file',
            'data_criacao',
            'duracao',
            'duracao_formatada',
            'autor_melodia',
            'autor_letra',
        ]
        read_only_fields = ['id', 'duracao', 'album_info', 'duracao_formatada']

    def get_duracao_formatada(self, obj):
        total_seconds = int(obj.duracao.total_seconds())
        minutes = total_seconds // 60
        seconds = total_seconds % 60
        return f"{minutes:02d}:{seconds:02d}"

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['id', 'musico', 'nome', 'endereco', 'imagem_do_evento', 'data_do_evento', 'descricao']

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class CurtidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curtida
        fields = '__all__'

class LeilaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leilao
        fields = '__all__'
    
class LanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lance
        fields = '__all__'

class EstatisticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatistica
        fields = '__all__'

class OuvinteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ouvinte
        fields = ['nome_completo', 'foto_perfil']



class UserSerializer(serializers.ModelSerializer):
    musico = MusicoSerializer(read_only=True)
    ouvinte = OuvinteSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'perfil', 'musico', 'ouvinte']

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)
    
    # dados do musico
    nome_artistico = serializers.CharField(required=False)
    biografia = serializers.CharField(required=False, allow_blank=True)
    redes_sociais = serializers.CharField(required=False, allow_blank=True)
    
    # dados do ouvinte
    nome_completo = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm', 'perfil',
            # músico
            'nome_artistico', 'biografia', 'redes_sociais',
            # ouvinte
            'nome_completo',
        ]

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'As senhas não coincidem.'})
        
        if data['perfil'] == "musico" and not data.get('nome_artistico'):
            raise serializers.ValidationError({'nome_artistico': 'Campo obrigatório para músicos.'})

        if data['perfil'] == "ouvinte" and not data.get('nome_completo'):
            raise serializers.ValidationError({'nome_completo': 'Campo obrigatório para ouvintes.'})

        return data
    

    def create(self, validated_data):
        validated_data.pop("password_confirm")

        perfil = validated_data.pop("perfil")
        
        nome_artistico = validated_data.pop("nome_artistico", None)
        biografia = validated_data.pop("biografia", "")
        redes_sociais = validated_data.pop("redes_sociais", "")

        nome_completo = validated_data.pop("nome_completo", None)

        user = User.objects.create_user(perfil=perfil, **validated_data)

        if perfil == "musico":
            Musico.objects.create(
                user=user,
                nome_artistico=nome_artistico,
                biografia=biografia,
                redes_sociais=redes_sociais
            )
        else:
            Ouvinte.objects.create(
                user=user,
                nome_completo=nome_completo
            )

        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        if hasattr(user, "musico"):
            token["role"] = "musico"
        elif hasattr(user, "ouvinte"):
            token["role"] = "ouvinte"
        else:
            token["role"] = "user"

        return token