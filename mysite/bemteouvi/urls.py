from django.urls import path
from . import views

urlpatterns = [
    path('', views.index , name='index'),   
    path('principal/', views.principal , name='principal'),
    path('cadastro/', views.cadastro , name='cadastro'),
    path('perfilUsuario/', views.perfilUsuario , name='perfilUsuario'),
    path('perfilMusico/', views.perfilMusico , name='perfilMusico'),
    path('letra/', views.letra , name='letra'),
    path('playlist/', views.playlist , name='playlist'),
    path('criarMusica/', views.criarMusica , name='criarMusica'),
    path('criarEvento/', views.criarEvento , name='criarEvento'),
    path('buscar/', views.buscar_ajax, name='buscar'),

]