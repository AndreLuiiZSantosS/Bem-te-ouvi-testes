from django.urls import path
from . import views
from .views import CustomLoginView, CustomLogoutView

app_name = 'bemteouvi'

urlpatterns = [
    # Página inicial
    path('', views.index, name='index'),

    # Autenticação e perfis
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    
    #perfis
    path('perfil-ouvinte/', views.perfil_ouvinte, name='perfil-ouvinte'),
    path('perfil-ouvinte/<int:id>/', views.perfil_ouvinte, name='perfil-ouvinte-id'),
    path('perfil-musico/', views.perfil_musico, name='perfil-musico'),
    path('perfil-musico/<int:id>/', views.perfil_musico, name='perfil-musico-id'),
    path('ouvinte/editar/', views.editar_perfil_ouvinte, name='editar-perfil-ouvinte'),
    path('musico/editar/', views.editar_perfil_musico, name='editar_perfil_musico'),


    # Playlists
    path('playlist/', views.playlist, name='playlist'),
    path('criar-playlist/', views.criar_playlist, name='criar-playlist'),
    path('playlist/<int:playlist_id>/excluir/', views.excluir_playlist, name='excluir-playlist'),
    path('playlist/adicionar-musicas/', views.adicionar_musicas_playlist, name='adicionar-musicas-playlist'),

    # Músicas
    path('criar-musica/', views.criar_musica, name='criar-musica'),

    # Eventos
    path('criar-evento/', views.criar_evento, name='criar-evento'),

    #Buscar
    path('buscar/', views.buscar, name='buscar'),
]