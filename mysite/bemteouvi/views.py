from django.shortcuts import render

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

def buscar(request):
    termo = request.GET.get('q', '').strip()

    artistas = Musico.objects.filter(nome__icontains=termo)
    usuarios = Usuario.objects.filter(nome__icontains=termo)
    musicas = Musica.objects.filter(titulo__icontains=termo)

    sugestao = None
    if not artistas and not usuarios and not musicas:
        todos_nomes = list(Musico.objects.values_list('nome', flat=True)) + \
                      list(Usuario.objects.values_list('nome', flat=True)) + \
                      list(Musica.objects.values_list('titulo', flat=True))
        matches = difflib.get_close_matches(termo, todos_nomes, n=1, cutoff=0.6)
        sugestao = matches[0] if matches else None

    contexto = {
        'termo': termo,
        'artistas': artistas,
        'usuarios': usuarios,
        'musicas': musicas,
        'sugestao': sugestao
    }

    return render(request, 'buscar.html', contexto)