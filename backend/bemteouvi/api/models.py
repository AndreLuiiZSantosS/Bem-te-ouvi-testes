from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    PERFIL_CHOICES = (
        ('musico', 'Músico'),
        ('ouvinte', 'Ouvinte'),
    )

    perfil = models.CharField(max_length=15, choices=PERFIL_CHOICES)

class Musico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_artistico = models.CharField(max_length=100)
    biografia = models.TextField(null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='fotos_de_perfil', null=True, blank=True)
    redes_sociais = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.nome_artistico

class Ouvinte(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nome_completo = models.CharField(max_length=100)
    foto_perfil = models.ImageField(upload_to='fotos_de_perfil', null=True, blank=True)

    def __str__(self):
        return self.nome_completo

class Album(models.Model):
    GENEROS_MUSICAIS = (
        ('jazz', 'Jazz'),
        ('rock', 'Rock'),
        ('pop', 'Pop'),
        ('classica', 'Clássica'),
        ('hip_hop', 'Hip Hop'),
        ('eletronica', 'Eletrônica'),
        ('samba', 'Samba'),
        ('mpb', 'MPB'),
        ('forro', 'Forró'),
        ('blues', 'Blues'),
        ('reggae', 'Reggae'),
        ('bossa_nova', 'Bossa Nova')
    )
    titulo = models.CharField(max_length=100)
    capa_do_album = models.ImageField(upload_to='capas_de_album')
    musicos = models.ManyToManyField(Musico) 
    data_de_lancamento = models.DateField()
    genero_musical = models.CharField(choices=GENEROS_MUSICAIS)

    def __str__(self):
        return f'{self.titulo} - {self.data_de_lancamento}'

class Musica(models.Model):
    
    GENEROS_MUSICAIS = (
        ('jazz', 'Jazz'),
        ('rock', 'Rock'),
        ('pop', 'Pop'),
        ('classica', 'Clássica'),
        ('hip_hop', 'Hip Hop'),
        ('eletronica', 'Eletrônica'),
        ('samba', 'Samba'),
        ('mpb', 'MPB'),
        ('forro', 'Forró'),
        ('blues', 'Blues'),
        ('reggae', 'Reggae'),
        ('bossa_nova', 'Bossa Nova')
    )

    album = models.ForeignKey(Album, related_name='musicas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    autor_melodia = models.ManyToManyField(Musico, related_name='autor_da_melodia')
    autor_letra = models.ManyToManyField(Musico, related_name='autor_da_letra')
    letra = models.TextField()
    data_criacao = models.DateField()
    arquivo_audio = models.FileField(upload_to='musicas')
    genero = models.CharField(choices=GENEROS_MUSICAIS)
    duracao = models.DurationField()

    def __str__(self):
        return f'Titulo: {self.titulo} - Genero musical: {self.genero} - Melodia: {self.autor_melodia} - Letra: {self.autor_letra}'

class Estatistica(models.Model):
    musica = models.OneToOneField(Musica, related_name="estatisticas_musica", on_delete=models.CASCADE)
    play_count = models.IntegerField(default=0)
    curtidas_count = models.IntegerField(default=0)
    comentarios_count = models.IntegerField(default=0)
    data_ultima_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.musica} - {self.curtidas}'

class Comentario(models.Model):
    usuario = models.ForeignKey(User, related_name="comentarios_usuario", on_delete=models.CASCADE)
    musica = models.ForeignKey(Musica, related_name="comentarios_musica", on_delete=models.CASCADE) 
    texto = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.usuario} - {self.texto}'
    
class Curtida(models.Model):
    usuario = models.ForeignKey(User, related_name="curtidas_usuário", on_delete=models.CASCADE)
    musica = models.ForeignKey(Musica, related_name="curtidas_musica", on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.usuario} - {self.curtida}'
    
class Leilao(models.Model):
    musico = models.ForeignKey(Musico, related_name="leiloes_musico", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    lance_inicial = models.DecimalField(max_digits=10, decimal_places=2)
    lance_atual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'{self.titulo} - {self.musico} - {self.descricao}'

class Lance(models.Model):
    usuario = models.ForeignKey(User, related_name="lances_usuario", on_delete=models.CASCADE)
    leilao = models.ForeignKey(Leilao, related_name="lances_leilao", on_delete=models.CASCADE)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.usuario

class Playlist(models.Model):
    usuario = models.ForeignKey(User, related_name="playlists_usuario", on_delete=models.CASCADE)
    musicas = models.ManyToManyField(Musica, related_name="playlists_musica")
    nome = models.CharField(max_length=100, null=False)

    def __str__(self):
        return f'{self.nome} - {self.musicas} - {self.usuario}'

class Evento(models.Model):
    musico = models.ForeignKey(Musico, related_name="eventos_musico", on_delete=models.CASCADE) 
    nome = models.CharField(max_length=100, null=False)
    endereco = models.CharField(max_length=255)
    imagem_do_evento = models.ImageField(upload_to='imagens_de_evento')     
    data_do_evento = models.DateTimeField() 
    descricao = models.TextField(null=True, blank=True)

    def __self__(self):
        return f'{self.nome} - {self.data_do_evento}'
