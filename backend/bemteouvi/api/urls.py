from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import registro_view, usuario_atual_view, CustomTokenView

urlpatterns = [
    path('registro/', registro_view, name='registro'),
    
    # JWT
    path('login/', CustomTokenView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('usuarios/', usuario_atual_view, name='usuario_atual'),
]
