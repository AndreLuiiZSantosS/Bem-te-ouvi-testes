from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.db import IntegrityError
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.http import JsonResponse
from .models import (
    Musico, Ouvinte, Musica, Playlist, Evento,
    EstatisticaSemanal, GeneroOuvido, EstatisticaMensalMusico, Reproducao
)
from django.urls import reverse_lazy
from django.utils import timezone
from collections import Counter
from django.db.models import Sum, Q
from django.contrib.auth.models import User
from .forms import OuvinteForm, MusicoForm, EditarPerfilOuvinteForm, EditarPerfilMusicoForm, PlaylistForm
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST

def index(request):
    musicas = Musica.objects.all()
    eventos = Evento.objects.all()
    context = {
        'musicas': musicas,
        'eventos': eventos,
    }


    if request.headers.get('HX-Request'):
        return render(request, 'bemteouvi/index_content.html', context)  # só o conteúdo do main
    return render(request, 'bemteouvi/index.html', context)  # base.html completo

def cadastro(request):
    if hasattr(request.user, 'musico'):
        return redirect('bemteouvi:index')
    elif hasattr(request.user, 'ouvinte'):
        return redirect('bemteouvi:index')
    
    if request.method == 'POST':
        tipo = request.POST.get('tipo_ouvinte')
        if tipo == 'ouvinte':
            form = OuvinteForm(request.POST, request.FILES)
        elif tipo == 'musico':
            form = MusicoForm(request.POST, request.FILES)
        else:
            messages.error(request, "Selecione um tipo de usuário válido.")
            form = None

        if form and form.is_valid():
                    try:
                        user = form.save()
                        login(request, user)
                        messages.success(request, "Cadastro realizado com sucesso!")
                        return redirect('bemteouvi:index')

                    except IntegrityError as e:
                        if tipo == 'musico' and 'cpf' in str(e).lower():
                            messages.error(request, "CPF já cadastrado. Tente outro.")
                        else:
                            messages.error(request, "Erro ao salvar usuário. Tente novamente.")
        else:
            messages.error(request, "Por favor, corrija os erros abaixo.")

    else:
        form = OuvinteForm()

    return render(request, 'bemteouvi/cadastro.html', {'form': form})


class CustomLoginView(LoginView):
    template_name = 'bemteouvi/login.html'
    success_url = reverse_lazy('bemteouvi:index') 

class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('bemteouvi:login')

@login_required
def perfil_ouvinte(request, id=None):
    # Se veio id na URL, tenta buscar esse ouvinte
    if id is not None:
        ouvinte = get_object_or_404(Ouvinte, id=id)
    else:
        # Se não veio id, mostra o perfil do usuário logado
        try:
            ouvinte = Ouvinte.objects.get(user=request.user)
        except Ouvinte.DoesNotExist:
            messages.error(request, "Perfil de ouvinte não encontrado.")
            return redirect('bemteouvi:index')

    proprio_perfil = (ouvinte.user == request.user)

    # Músicas ouvidas (contagem única por música)
    musicas_ouvidas = Reproducao.objects.filter(ouvinte=ouvinte).values('musica').distinct().count()
    # Histórico de reprodução (últimas 10)
    historico = Reproducao.objects.filter(ouvinte=ouvinte).order_by('-data_hora')[:10]
    # Minutos ouvidos no mês
    hoje = timezone.now()
    minutos_mes = EstatisticaSemanal.objects.filter(
        ouvinte=ouvinte
    ).aggregate(total=Sum('minutos_ouvidos'))['total'] or 0

    # Gênero favorito (%)
    generos = GeneroOuvido.objects.filter(ouvinte=ouvinte)
    total_segundos = sum(g.segundos_ouvidos for g in generos)
    genero_favorito = None
    genero_percentual = 0
    if total_segundos > 0:
        favorito = max(generos, key=lambda g: g.segundos_ouvidos)
        genero_favorito = favorito.genero
        genero_percentual = round((favorito.segundos_ouvidos / total_segundos) * 100, 1)

    # Estatística semanal para gráfico
    estatisticas = EstatisticaSemanal.objects.filter(ouvinte=ouvinte).order_by('dia')
    estatisticas_dict = [e.minutos_ouvidos for e in estatisticas]

    context = {
        'ouvinte': ouvinte,
        'musicas_ouvidas': musicas_ouvidas,
        'historico': historico,
        'minutos_mes': minutos_mes,
        'genero_favorito': genero_favorito,
        'genero_percentual': genero_percentual,
        'estatisticas': estatisticas_dict,
        'proprio_perfil': proprio_perfil,
    }

    if request.headers.get('HX-Request'):
        return render(request, 'bemteouvi/perfil_ouvinte_content.html', context)
    return render(request, 'bemteouvi/perfil_ouvinte.html', context)

@login_required
def editar_perfil_ouvinte(request):
    ouvinte = request.user.ouvinte
    if request.method == 'POST':
        form = EditarPerfilOuvinteForm(request.POST, request.FILES, instance=ouvinte, user=request.user)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = EditarPerfilOuvinteForm(instance=ouvinte, user=request.user)

        html_form = render_to_string('bemteouvi/partials/form_editar_ouvinte.html', {'form': form}, request=request)
        return JsonResponse({'html_form': html_form})


@login_required
def perfil_musico(request):
    musico_id = request.GET.get('id')
    if musico_id:
        musico = get_object_or_404(Musico, id=musico_id)
    else:
        try:
            musico = Musico.objects.get(user=request.user)
        except Musico.DoesNotExist:
            messages.error(request, "Você não possui perfil de músico.")
            return redirect('bemteouvi:index')

    hoje = timezone.now()
    estatistica = EstatisticaMensalMusico.objects.filter(
        musico=musico, mes=hoje.month, ano=hoje.year
    ).first()
    minutos_ouvidos = estatistica.minutos_ouvidos if estatistica else 0
    total_reproducoes = estatistica.total_reproducoes if estatistica else 0
    dinheiro_arrecadado = round(minutos_ouvidos * 0.05, 2)

    # Gênero favorito das músicas do músico
    musicas = Musica.objects.filter(musico=musico)
    generos = musicas.values_list('genero', flat=True)
    genero_favorito = None
    if generos:
        contagem = Counter(generos)
        genero_favorito = contagem.most_common(1)[0][0]

    context = {
        'musico': musico,
        'minutos_ouvidos': minutos_ouvidos,
        'total_reproducoes': total_reproducoes,
        'dinheiro_arrecadado': dinheiro_arrecadado,
        'genero_favorito': genero_favorito,
        'musicas': musicas,
    }

    if request.headers.get('HX-Request'):
        return render(request, 'bemteouvi/perfil_musico_content.html', context)
    return render(request, 'bemteouvi/perfil_musico.html', context)

@login_required
def editar_perfil_musico(request):
    musico = request.user.musico
    if request.method == 'POST':
        form = EditarPerfilMusicoForm(request.POST, request.FILES, instance=musico, user=request.user)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = EditarPerfilMusicoForm(instance=musico, user=request.user)
        html_form = render_to_string('bemteouvi/partials/form_editar_musico.html', {'form': form}, request=request)
        return JsonResponse({'html_form': html_form})

@login_required
def criar_evento(request):
    if not hasattr(request.user, 'musico'):
        return redirect('bemteouvi:index')

    if request.method == 'POST':
        nome = request.POST.get('nomeEvento')
        descricao = request.POST.get('descricaoEvento')
        data = request.POST.get('dataEvento')
        local = request.POST.get('localEvento')
        foto_evento = request.FILES.get('fotoEvento')

        Evento.objects.create(
            nome=nome,
            descricao=descricao,
            data=data,
            local=local, 
            foto_evento=foto_evento,
            musico=request.user.musico
        )
        return redirect('bemteouvi:index')

    template = 'bemteouvi/criar_evento_content.html' if request.headers.get('HX-Request') else 'bemteouvi/criar_evento.html'
    return render(request, template)


@login_required
def criar_musica(request):
    if not hasattr(request.user, 'musico'):
        return redirect('bemteouvi:index')

    generos = Musica.GENERO_CHOICES

    if request.method == 'POST':
        titulo = request.POST.get('nomeMusica')
        genero = request.POST.get('generoMusica')
        capa = request.FILES.get('imagemMusica')
        audio = request.FILES.get('audioMusica')

        Musica.objects.create(
            titulo=titulo,
            genero=genero,
            capa=capa,
            audio=audio,
            musico=request.user.musico
        )
        return redirect('bemteouvi:index')

    template = 'bemteouvi/criar_musica_content.html' if request.headers.get('HX-Request') else 'bemteouvi/criar_musica.html'
    return render(request, template, {'generos': generos})

@login_required
def playlist(request):
    user = request.user
    try:
        ouvinte = Ouvinte.objects.get(user=user)
        playlists = Playlist.objects.filter(ouvinte=ouvinte)
        criador = ouvinte
    except Ouvinte.DoesNotExist:
        musico = Musico.objects.get(user=user)
        playlists = Playlist.objects.filter(musico=musico)
        criador = musico

    musicas = Musica.objects.all()

    return render(request, 'bemteouvi/playlist.html', {
        'criador': criador,
        'musicas': musicas,
        'playlists': playlists,
    })


@login_required
def criar_playlist(request):
    print("View criar_playlist chamada")  # DEBUG

    if request.method == 'POST':
        print("POST recebido com dados:", request.POST, "Arquivos:", request.FILES)  # DEBUG

        user = request.user
        nome = request.POST.get('nome')
        musicas_ids = request.POST.getlist('musicas')
        capa = request.FILES.get('capa')

        if not nome:
            return render(request, 'bemteouvi/componentes/playlist_erro.html', {'erro': 'Nome da playlist é obrigatório.'})

        if not musicas_ids:
            return render(request, 'bemteouvi/componentes/playlist_erro.html', {'erro': 'Selecione ao menos uma música.'})

        try:
            ouvinte = Ouvinte.objects.get(user=user)
            playlist = Playlist.objects.create(nome=nome, ouvinte=ouvinte, capa=capa)
        except Ouvinte.DoesNotExist:
            try:
                musico = Musico.objects.get(user=user)
                playlist = Playlist.objects.create(nome=nome, musico=musico, capa=capa)
            except Musico.DoesNotExist:
                return render(request, 'bemteouvi/componentes/playlist_erro.html', {'erro': 'Usuário não está associado a nenhum perfil válido.'})

        playlist.musicas.set(musicas_ids)
        playlist.save()

        print(f"Playlist '{playlist.nome}' criada com sucesso!")
    
        return redirect('bemteouvi:playlist')

    return redirect('bemteouvi:playlist')

@login_required
@require_POST
def adicionar_musicas_playlist(request):
    playlist_id = request.POST.get('playlist_id')
    musicas_ids = request.POST.getlist('musicas')

    try:
        user = request.user

        try:
            perfil = user.musico
            filtro_playlist = {'musico': perfil}
        except Musico.DoesNotExist:
            try:
                perfil = user.ouvinte
                filtro_playlist = {'ouvinte': perfil}
            except Ouvinte.DoesNotExist:
                return JsonResponse({'erro': 'Usuário não é músico nem ouvinte'}, status=403)

        playlist = Playlist.objects.get(id=playlist_id, **filtro_playlist)

        musicas = Musica.objects.filter(id__in=musicas_ids)
        playlist.musicas.add(*musicas)

        return redirect('bemteouvi:playlist')

    except Playlist.DoesNotExist:
        return JsonResponse({'erro': 'Playlist não encontrada ou não pertence a este usuário'}, status=404)
    except Exception as e:
        return JsonResponse({'erro': str(e)}, status=500)

@login_required
def excluir_playlist(request, playlist_id):
    playlist = get_object_or_404(Playlist, id=playlist_id)

    # Só o criador pode excluir
    if playlist.ouvinte and playlist.ouvinte.user == request.user or \
       playlist.musico and playlist.musico.user == request.user:

        if request.method == 'POST':
            playlist.delete()
            return redirect('bemteouvi:playlist')
    
    # Caso não tenha permissão ou método diferente
    return redirect('bemteouvi:playlist')


# View to render the HTML search results page
def buscar(request):
    termo = request.GET.get('q', '').strip()
    # Busca musico pelo username do usuário relacionado
    musicos = Musico.objects.filter(user__username__icontains=termo) if termo else []
    # Busca ouvintes pelo username do usuário relacionado
    ouvintes = Ouvinte.objects.filter(user__username__icontains=termo) if termo else []
    # Junta todos os usuários encontrados (musicos + ouvintes)
    ouvintes = list(musicos) + list(ouvintes)
    # Busca músicas normalmente
    musicas = Musica.objects.filter(
        Q(titulo__icontains=termo) | Q(musico__user__username__icontains=termo)
    ) if termo else []
    # Busca playlists normalmente
    playlists = Playlist.objects.filter(nome__icontains=termo) if termo else []

    context = {
        'termo': termo,
        'musicos': musicos,
        'ouvintes': ouvintes,
        'musicas': musicas,
        'playlists': playlists,
    }
    return render(request, 'bemteouvi/buscar.html', context)

# View to return JSON results (for async usage)
def buscar_ajax(request):
    termo = request.GET.get('q', '').strip()

    if not termo:
        return JsonResponse({'resultados': []})

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
        # Musicos
        musicos = Musico.objects.filter(user__username__icontains=termo)
        for musico in musicos:
            resultados.append(criar_resultado(
                'musico',
                musico.user.username,
                musico.foto_perfil.url if hasattr(musico, 'foto_perfil') and musico.foto_perfil else '/static/bemteouvi/img/default-profile.png',
                f'/perfil_musico/{musico.id}/'
            ))

        # Ouvintes
        ouvintes = Ouvinte.objects.filter(user__username__icontains=termo)
        for ouvinte in ouvintes:
            resultados.append(criar_resultado(
                'ouvinte',
                ouvinte.user.username,
                ouvinte.foto_perfil.url if hasattr(ouvinte, 'foto_perfil') and ouvinte.foto_perfil else '/static/bemteouvi/img/default-profile.png',
                f'/perfil_ouvinte/{ouvinte.id}/'
            ))

        # Musicas
        musicas = Musica.objects.filter(titulo__icontains=termo)
        for musica in musicas:
            resultados.append(criar_resultado(
                'musica',
                musica.titulo,
                musica.capa.url if hasattr(musica, 'capa') and musica.capa else '/static/bemteouvi/img/default-music.png',
                f'/letra/{musica.id}/',
                subtitulo=musica.musico.user.username if hasattr(musica, 'musico') and hasattr(musica.musico, 'user') else None
            ))

        # Playlists
        playlists = Playlist.objects.filter(nome__icontains=termo)
        for playlist in playlists:
            resultados.append(criar_resultado(
                'playlist',
                playlist.nome,
                playlist.capa.url if hasattr(playlist, 'capa') and playlist.capa else '/static/bemteouvi/img/default-playlist.png',
                f'/playlist/{playlist.id}/'
            ))

    except Exception as e:
        resultados = [
            criar_resultado('musico', 'musico Mock', '/static/bemteouvi/img/default-profile.png', '/perfilMusico/1/'),
            criar_resultado('ouvinte', 'Usuário Mock', '/static/bemteouvi/img/default-profile.png', '/perfilOuvinte/1/'),
            criar_resultado('musica', 'Música Mock', '/static/bemteouvi/img/default-music.png', '/letra/1/', subtitulo='musico Mock'),
            criar_resultado('playlist', 'Playlist Mock', '/static/bemteouvi/img/default-playlist.png', '/playlist/1/')
        ]
    return JsonResponse({'resultados': resultados})
