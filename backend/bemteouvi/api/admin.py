from django.contrib import admin
from .models import Album, Musica, Evento, Ouvinte, Musico, Leilao, Lance, Estatistica, Curtida, Comentario, Playlist

admin.site.register(Album)
admin.site.register(Musica)
admin.site.register(Playlist)
admin.site.register(Ouvinte)
admin.site.register(Musico)
admin.site.register(Evento)
admin.site.register(Leilao)
admin.site.register(Lance)
admin.site.register(Estatistica)
admin.site.register(Curtida)
admin.site.register(Comentario)
