from django.shortcuts import render
from .models import Musico, Usuario, Musica

# Create your views here.

def index(request):
    return render(request, 'bemteouvi/index.html')

def principal(request):
    return render(request, 'bemteouvi/principal.html')

def cadastro(request):
    return render(request, 'bemteouvi/cadastro.html')

def perfilUsuario(request):
    return render(request, 'bemteouvi/perfilUsuario.html')

def perfilMusico(request):
    return render(request, 'bemteouvi/perfilMusico.html')

def letra(request):
    return render(request, 'bemteouvi/letra.html')

def playlist(request):
    return render(request, 'bemteouvi/playlist.html')

def criarMusica(request):
    return render(request, 'bemteouvi/criarMusica.html')

def criarEvento(request):
    return render(request, 'bemteouvi/criarEvento.html')

from django.http import JsonResponse

from django.http import JsonResponse

# Importa models, se existirem
try:
    from bemteouvi.models import Musico, Musica, Playlist
except ImportError:
    Musico = Musica = Playlist = None

try:
    from usuarios.models import Usuario
except ImportError:
    Usuario = None

def buscar_ajax(request):
    termo = request.GET.get('q', '').strip()

    # Retorna vazio se nenhum termo foi digitado
    if not termo:
        return JsonResponse({'resultados': []})

    # Função para padronizar estrutura dos resultados
    def criar_resultado(tipo, nome, imagem, url, subtitulo=None):
        resultado = {
            'tipo': tipo,
            'nome': nome,
            'imagem': imagem,
            'url': url,
        }
        if subtitulo:
            resultado['subtitulo'] = subtitulo
        return resultado

    resultados = []

    try:
        # Busca músicos
        if Musico:
            artistas = Musico.objects.filter(nome__icontains=termo)
            for artista in artistas:
                resultados.append(criar_resultado(
                    'musico',
                    artista.nome,
                    artista.foto.url if hasattr(artista, 'foto') and artista.foto else '/static/bemteouvi/img/default-profile.png',
                    f'/perfilMusico/{artista.id}/'
                ))

        # Busca usuários
        if Usuario:
            usuarios = Usuario.objects.filter(nome__icontains=termo)
            for usuario in usuarios:
                resultados.append(criar_resultado(
                    'usuario',
                    usuario.nome,
                    usuario.foto.url if hasattr(usuario, 'foto') and usuario.foto else '/static/bemteouvi/img/default-profile.png',
                    f'/perfilUsuario/{usuario.id}/'
                ))

        # Busca músicas
        if Musica:
            musicas = Musica.objects.filter(titulo__icontains=termo)
            for musica in musicas:
                resultados.append(criar_resultado(
                    'musica',
                    musica.titulo,
                    musica.capa.url if hasattr(musica, 'capa') and musica.capa else '/static/bemteouvi/img/default-music.png',
                    f'/letra/{musica.id}/',
                    subtitulo=musica.artista.nome if hasattr(musica, 'artista') and musica.artista else None
                ))

        # Busca playlists
        if Playlist:
            playlists = Playlist.objects.filter(nome__icontains=termo)
            for playlist in playlists:
                resultados.append(criar_resultado(
                    'playlist',
                    playlist.nome,
                    playlist.capa.url if hasattr(playlist, 'capa') and playlist.capa else '/static/bemteouvi/img/default-playlist.png',
                    f'/playlist/{playlist.id}/'
                ))

    # Se der erro (ex: tabela não criada), retorna dados mock
    except Exception as e:
        resultados = [
            criar_resultado('musico', 'Artista Mock', '/static/bemteouvi/img/default-profile.png', '/perfilMusico/1/'),
            criar_resultado('usuario', 'Usuário Mock', '/static/bemteouvi/img/default-profile.png', '/perfilUsuario/1/'),
            criar_resultado('musica', 'Música Mock', '/static/bemteouvi/img/default-music.png', '/letra/1/', subtitulo='Artista Mock'),
            criar_resultado('playlist', 'Playlist Mock', '/static/bemteouvi/img/default-playlist.png', '/playlist/1/')
        ]

    # Retorna os resultados no formato JSON
    return JsonResponse({'resultados': resultados})
