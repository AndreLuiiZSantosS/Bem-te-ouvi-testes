from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS

# permissões de tipo do usuário
class HasRole(BasePermission):
    allowed_roles = []

    def has_permission(self, request, view):
        return(
            request.user.is_authenticated and
            request.auth.get("role") in self.allowed_roles
        )
    
class IsMusico(HasRole):
    allowed_roles=["musico"]

class IsOuvinte(HasRole):
    allowed_roles=["ouvinte"]


# permissões por requisições HTTP
class AlbumPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: # GET, HEAD e OPTIONS
            return role in ["ouvinte","musico"]
        
        return role == "musico" # Todos os outros métodos
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id # apenas o criador pode modificar o próprio objeto dele

from rest_framework.permissions import BasePermission, SAFE_METHODS

class MusicaPermission(BasePermission):
    """
    Permissões para o recurso Musica:
    - GET (SAFE_METHODS) -> público (qualquer um, mesmo visitante)
    - GET action='mais_ouvidas' -> público
    - GET action='mais_ouvidas_usuario' -> apenas o próprio usuário logado
    - POST/PUT/DELETE -> apenas músicos
    """

    def has_permission(self, request, view):
        # visitantes e logados podem fazer GET
        if request.method in SAFE_METHODS:
            return True

        # ações públicas específicas
        if getattr(view, "action", None) == "mais_ouvidas":
            return True

        # ações que exigem usuário logado
        if not request.user.is_authenticated:
            return False

        # ação exclusiva do próprio usuário
        if getattr(view, "action", None) == "mais_ouvidas_usuario":
            return True  # será filtrado na view pelo user logado

        # outros métodos (POST/PUT/DELETE) apenas músicos
        role = None
        if request.auth:
            # request.auth é geralmente um dict no seu JWT personalizado
            role = request.auth.get("role")
        return role == "musico"

    def has_object_permission(self, request, view, obj):
        """
        Controle de permissão por objeto:
        - SAFE_METHODS -> todos podem acessar
        - Músico só pode modificar suas próprias músicas
        """
        if request.method in SAFE_METHODS:
            return True

        if not request.user.is_authenticated:
            return False

        return hasattr(obj, "musico") and obj.musico.user_id == request.user.id

    

class EventoPermission(BasePermission):
    """
    Permissões para o recurso Evento:
    - GET (SAFE_METHODS) -> público (qualquer um, mesmo visitante)
    - POST/PUT/DELETE -> apenas músicos autenticados
    - Modificação de objeto -> apenas o dono do evento
    """

    def has_permission(self, request, view):
        # 1. Visitantes e logados podem fazer GET (SAFE_METHODS)
        if request.method in SAFE_METHODS:
            return True

        # 2. Para métodos não seguros (POST, PUT, DELETE), exige login
        if not request.user.is_authenticated:
            return False

        # 3. Verifica se é músico
        role = None
        if request.auth:
            role = request.auth.get("role")
        
        return role == "musico"

    def has_object_permission(self, request, view, obj):
        # 1. Leitura pública
        if request.method in SAFE_METHODS:
            return True
        
        # 2. Garante que está autenticado para modificar
        if not request.user.is_authenticated:
            return False

        # 3. Apenas o dono do evento pode editá-lo ou excluí-lo
        # Verifica se o objeto tem o atributo 'musico' e se o ID bate
        return hasattr(obj, "musico") and obj.musico.user_id == request.user.id

class PlaylistPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
class ComentarioPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
class CurtidaPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
class LeilaoPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
class LancePermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
class EstatisticaPermission(BasePermission):

    def has_permission(self, request, view):
        role = request.auth.get("role")

        if request.method in SAFE_METHODS: 
            return role in ["ouvinte","musico"]
        
        return role == "musico"
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.musico.user_id == request.user.id
    
    
    

