from rest_framework import serializers
import json
import datetime
from .models import Album, Musica, Evento, Playlist, Comentario, Curtida, Leilao, Lance, Estatistica, Ouvinte, Musico  

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
    
class MusicaSerializer(serializers.ModelSerializer):
    audio_file = serializers.FileField(source='arquivo_audio')
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all())
    
    class Meta:
        model = Musica
        
        fields = [
            'id',
            'album',         
            'titulo',         
            'letra',          
            'genero',         
            'audio_file',     
            'data_criacao',
            'duracao',
        ]
        
        read_only_fields = ['id', 'data_criacao', 'duracao']

    def create(self, validated_data):
        
        validated_data['data_criacao'] = datetime.date.today()
        validated_data['duracao'] = datetime.timedelta(seconds=0) 
        musica = Musica.objects.create(**validated_data)

        return musica

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = '__all__'

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
        fields = '__all__'

class MusicoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='nome_artistico')
    avatar = serializers.ImageField(source='foto_perfil')
    
    class Meta:
        model = Musico
        fields = '__all__'

