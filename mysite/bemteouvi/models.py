from django.db import models

class Musico(models.Model):
    nome = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='musicos/', null=True, blank=True)

    def __str__(self):
        return self.nome

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='usuarios/', null=True, blank=True)

    def __str__(self):
        return self.nome

class Musica(models.Model):
    titulo = models.CharField(max_length=100)
    artista = models.ForeignKey(Musico, on_delete=models.CASCADE)
    capa = models.ImageField(upload_to='capas/', null=True, blank=True)

    def __str__(self):
        return self.titulo
