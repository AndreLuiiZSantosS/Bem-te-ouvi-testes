from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    PERFIL_CHOICES = (
        ('musico', 'Músico'),
        ('ouvinte', 'Ouvinte'),
    )

    perfil = models.CharField(max_length=15, choices=PERFIL_CHOICES)

    def __str__(self):
        return self.username


class Musico(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="musico")
    nome_artistico = models.CharField(max_length=100)
    biografia = models.TextField(null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='fotos_de_perfil', null=True, blank=True)
    redes_sociais = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.nome_artistico


class Ouvinte(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="ouvinte")
    nome_completo = models.CharField(max_length=100)
    foto_perfil = models.ImageField(upload_to='fotos_de_perfil', null=True, blank=True)

    def __str__(self):
        return self.nome_completo


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


class Album(models.Model):
    titulo = models.CharField(max_length=100)
    capa_do_album = models.ImageField(upload_to='capas_de_album')
    musicos = models.ManyToManyField(Musico)
    data_de_lancamento = models.DateField()
    genero_musical = models.CharField(max_length=20, choices=GENEROS_MUSICAIS)

    def __str__(self):
        return f'{self.titulo} ({self.data_de_lancamento})'


class Musica(models.Model):
    album = models.ForeignKey(Album, related_name='musicas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    autor_melodia = models.ManyToManyField(Musico, related_name='melodias')
    autor_letra = models.ManyToManyField(Musico, related_name='letras')
    letra = models.TextField()
    data_criacao = models.DateField()
    arquivo_audio = models.FileField(upload_to='musicas')
    genero = models.CharField(max_length=20, choices=GENEROS_MUSICAIS)
    duracao = models.DurationField()

    def __str__(self):
        return f'{self.titulo} - {self.genero}'


class Estatistica(models.Model):
    musica = models.OneToOneField(Musica, related_name="estatisticas", on_delete=models.CASCADE)
    play_count = models.IntegerField(default=0)
    curtidas_count = models.IntegerField(default=0)
    comentarios_count = models.IntegerField(default=0)
    data_ultima_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Estatísticas de {self.musica.titulo}'


class Comentario(models.Model):
    usuario = models.ForeignKey(User, related_name="comentarios", on_delete=models.CASCADE)
    musica = models.ForeignKey(Musica, related_name="comentarios", on_delete=models.CASCADE)
    texto = models.TextField()
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.usuario.username}: {self.texto[:30]}'


class Curtida(models.Model):
    usuario = models.ForeignKey(User, related_name="curtidas", on_delete=models.CASCADE)
    musica = models.ForeignKey(Musica, related_name="curtidas", on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.usuario.username} curtiu {self.musica.titulo}'


class Leilao(models.Model):
    musico = models.ForeignKey(Musico, related_name="leiloes", on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    lance_inicial = models.DecimalField(max_digits=10, decimal_places=2)
    lance_atual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f'{self.titulo} - {self.musico.nome_artistico}'


class Lance(models.Model):
    usuario = models.ForeignKey(User, related_name="lances", on_delete=models.CASCADE)
    leilao = models.ForeignKey(Leilao, related_name="lances", on_delete=models.CASCADE)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_hora = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} - R${self.valor}"


class Playlist(models.Model):
    usuario = models.ForeignKey(User, related_name="playlists", on_delete=models.CASCADE)
    musicas = models.ManyToManyField(Musica, related_name="playlists")
    nome = models.CharField(max_length=100)

    def __str__(self):
        return f'Playlist {self.nome} - {self.usuario.username}'


class Evento(models.Model):
    musico = models.ForeignKey(Musico, related_name="eventos", on_delete=models.CASCADE)
    nome = models.CharField(max_length=100)
    endereco = models.CharField(max_length=255)
    imagem_do_evento = models.ImageField(upload_to='imagens_de_evento')
    data_do_evento = models.DateTimeField()
    descricao = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.nome} - {self.data_do_evento}'


class PlayerCountUsuario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='players')
    musica = models.ForeignKey(Musica, on_delete=models.CASCADE, related_name='players')
    play_count = models.IntegerField(default=0)
    ultima_reproducao = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'musica')

    def __str__(self):
        return f"{self.usuario.username} ouviu {self.musica.titulo} {self.play_count} vezes"
