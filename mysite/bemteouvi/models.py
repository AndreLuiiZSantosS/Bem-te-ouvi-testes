from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import re

def validar_cpf(cpf):
    cpf = re.sub(r'\D', '', cpf)  # Remove pontos e traço
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        raise ValidationError("CPF inválido")

    # Valida os dois dígitos verificadores
    for i in range(9, 11):
        soma = sum(int(cpf[j]) * ((i+1) - j) for j in range(i))
        digito = ((soma * 10) % 11) % 10
        if digito != int(cpf[i]):
            raise ValidationError("CPF inválido")

class Ouvinte(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    foto_perfil = models.ImageField(upload_to='fotos_perfil', blank=True, null=True)


    @property
    def foto_url(self):
        if self.foto_perfil and self.foto_perfil.name:
            return self.foto_perfil.url
        return '/static/bemteouvi/img/perfil.png'
    
    def __str__(self):
        return self.user.username

class Musico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    foto_perfil = models.ImageField(upload_to='fotos_perfil', blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True)
    chave_pix = models.CharField(max_length=100, blank=True, null=True)


    @property
    def foto_url(self):
        if self.foto_perfil and self.foto_perfil.name:
            return self.foto_perfil.url
        return '/static/bemteouvi/img/perfil.png'


    def __str__(self):
        return self.user.username

class Musica(models.Model):
    GENERO_CHOICES = [
        ('rock', 'Rock'),
        ('pop', 'Pop'),
        ('indie', 'Indie'),
        ('mpb', 'MPB'),
        ('eletronica', 'Eletrônica'),
        ('jazz', 'Jazz'),
        ('classica', 'Clássica'),
        ('sertanejo', 'Sertanejo'),
        ('rap', 'Rap'),
        ('funk', 'Funk'),
        ('samba', 'Samba'),
        ('forro', 'Forró'),
        ('bossa_nova', 'Bossa Nova'),
        ('reggae', 'Reggae'),
        ('blues', 'Blues'),
        ('gospel', 'Gospel'),
        ('country', 'Country'),
        ('soul', 'Soul'),
        ('hip_hop', 'Hip Hop'),
        ('metal', 'Metal'),
        ('punk', 'Punk'),
        ('swing', 'Swing'),
        ('latino', 'Latino'),
        ('kpop', 'K-Pop'),
        ('eletronica_brasileira', 'Eletrônica Brasileira'),
        ('trap', 'Trap'),
        ('brega', 'Brega'),
        ('sertanejo_universitario', 'Sertanejo Universitário'),
        ('pagode', 'Pagode'),
        ('axé', 'Axé'),   
    ]
    titulo = models.CharField(max_length=200)
    genero = models.CharField(max_length=100, choices=GENERO_CHOICES)
    data_lancamento = models.DateField(auto_now_add=True)
    audio = models.FileField(upload_to='musicas/', null=True, blank=True)
    capa = models.ImageField(upload_to='capa_musica/', blank=True, null=True)
    musico = models.ForeignKey(Musico, on_delete=models.CASCADE, related_name='musicas')

    def __str__(self):
        return self.titulo

class Playlist(models.Model):
    nome = models.CharField(max_length=100)
    musicas = models.ManyToManyField(Musica, related_name='playlists')
    capa = models.ImageField(upload_to='playlists/', null=True, blank=True)
    ouvinte = models.ForeignKey(Ouvinte, on_delete=models.CASCADE, null=True, blank=True, related_name='playlists')
    musico = models.ForeignKey(Musico, on_delete=models.CASCADE, null=True, blank=True, related_name='playlists')

    def __str__(self):
        return self.nome

    @property
    def criador(self):
        return self.ouvinte or self.musico

class Evento(models.Model):
    nome = models.CharField(max_length=100)
    descricao =models.TextField()
    data = models.DateField()
    local = models.CharField(max_length=100)
    foto_evento = models.ImageField(upload_to='foto_evento/', blank=True, null=True)
    musico = models.ForeignKey(Musico, on_delete=models.CASCADE, related_name='eventos')

    def __str__(self):
        return self.nome
    
# Estatísticas semanais do ouvinte (minutos ouvidos por dia da semana)
class EstatisticaSemanal(models.Model):
    ouvinte = models.ForeignKey(Ouvinte, on_delete=models.CASCADE)
    dia = models.IntegerField()  # 0=Domingo ... 6=Sábado
    minutos_ouvidos = models.IntegerField(default=0)

class GeneroOuvido(models.Model):
    ouvinte = models.ForeignKey(Ouvinte, on_delete=models.CASCADE)
    genero = models.CharField(max_length=100)
    segundos_ouvidos = models.IntegerField(default=0)

class EstatisticaMensalMusico(models.Model):
    musico = models.ForeignKey(Musico, on_delete=models.CASCADE)
    mes = models.IntegerField()
    ano = models.IntegerField()
    minutos_ouvidos = models.IntegerField(default=0)
    total_reproducoes = models.IntegerField(default=0)

class Reproducao(models.Model):
    ouvinte = models.ForeignKey(Ouvinte, on_delete=models.CASCADE)
    musica = models.ForeignKey(Musica, on_delete=models.CASCADE)
    data_hora = models.DateTimeField(auto_now_add=True)
    duracao_segundos = models.IntegerField(default=0)  # quanto tempo ouviu

    def __str__(self):
        return f"{self.ouvinte} ouviu {self.musica} em {self.data_hora}"



