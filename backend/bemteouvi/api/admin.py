from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Album, Musica, Evento, Ouvinte, Musico, Leilao, Lance, Estatistica, Curtida, Comentario, Playlist, User

admin.site.register(Album)
admin.site.register(Musica)
admin.site.register(Playlist)
admin.site.register(Evento)
admin.site.register(Leilao)
admin.site.register(Lance)
admin.site.register(Estatistica)
admin.site.register(Curtida)
admin.site.register(Comentario)

@admin.register(User)
class UsuarioAdmin(UserAdmin):
    list_display = ['username', 'email', 'perfil', 'is_staff']

@admin.register(Musico)
class MusicoAdmin(admin.ModelAdmin):
    list_display = ['nome_artistico', 'user']

@admin.register(Ouvinte)
class OuvinteAdmin(admin.ModelAdmin):
    list_display = ['nome_completo', 'user']
