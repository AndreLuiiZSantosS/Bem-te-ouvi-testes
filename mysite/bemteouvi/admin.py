from django.contrib import admin
from .models import Ouvinte, Musico, Playlist, Musica, Evento, EstatisticaSemanal, GeneroOuvido, EstatisticaMensalMusico, Reproducao


admin.site.register(Ouvinte)
admin.site.register(Musico)
admin.site.register(Musica)
admin.site.register(Playlist)
admin.site.register(Evento)

