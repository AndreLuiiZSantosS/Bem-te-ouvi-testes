import django_filters
from .models import Musica, PlayerCountUsuario



class MusicaMaisOuvidaFilter(django_filters.FilterSet):
    titulo = django_filters.CharFilter(field_name='titulo', lookup_expr='icontains')
    artista = django_filters.CharFilter(field_name='album__musicos__nome_artistico', lookup_expr='icontains')
    genero = django_filters.CharFilter(field_name='genero', lookup_expr='iexact')
    min_plays = django_filters.NumberFilter(field_name='estatisticas__play_count', lookup_expr='gte')
    max_plays = django_filters.NumberFilter(field_name='estatisticas__play_count', lookup_expr='lte')

    class Meta:
        model = Musica
        fields = ['titulo', 'artista', 'genero', 'min_plays', 'max_plays']


class MusicaMaisOuvidaFilter(django_filters.FilterSet):
    usuario_id = django_filters.NumberFilter(method='filter_por_usuario', label="ID do usuário")
    
    class Meta:
        model = Musica
        fields = ['titulo', 'album'] 

    def filter_por_usuario(self, queryset, name, value):
        return queryset.filter(playercountusuario__usuario_id=value)
