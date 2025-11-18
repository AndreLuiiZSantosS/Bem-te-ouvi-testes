from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from api import views

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation with Swagger",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'albuns', views.AlbumViewSet)
router.register(r'musicas', views.MusicaViewSet)
router.register(r'eventos', views.EventoViewSet)
router.register(r'playlists', views.PlaylistViewSet)
router.register(r'comentarios', views.ComentarioViewSet)
router.register(r'curtidas', views.CurtidaViewSet)
router.register(r'leiloes', views.LeilaoViewSet)
router.register(r'lances', views.LanceViewSet)  
router.register(r'estatisticas', views.EstatisticaViewSet)
router.register(r'ouvintes', views.OuvinteViewSet)
router.register(r'musicos', views.MusicoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bemteouvi_api/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)