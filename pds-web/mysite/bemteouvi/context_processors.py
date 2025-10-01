def perfil_usuario(request):
    perfil = None
    if request.user.is_authenticated:
        if hasattr(request.user, 'musico'):
            perfil = request.user.musico
        elif hasattr(request.user, 'ouvinte'):
            perfil = request.user.ouvinte
    return {'perfil_usuario': perfil}
