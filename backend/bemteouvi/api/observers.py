from abc import ABC, abstractmethod
from .models import Estatistica, PlayerCountUsuario

class MusicaObserver(ABC):
    @abstractmethod
    def update(self, musica, usuario):
        pass

class MusicaSubject:
    def __init__(self):
        self._observers = []

    def attach(self, observer: MusicaObserver):
        self._observers.append(observer)

    def notify(self, musica, usuario):
        for observer in self._observers:
            observer.update(musica, usuario)

class EstatisticaGlobalObserver(MusicaObserver):
    def update(self, musica, usuario):
        estatistica, _ = Estatistica.objects.get_or_create(musica=musica)
        estatistica.play_count += 1
        estatistica.save()

class HistoricoUsuarioObserver(MusicaObserver):
    def update(self, musica, usuario):
        player, _ = PlayerCountUsuario.objects.get_or_create(usuario=usuario, musica=musica)
        player.play_count += 1
        player.save()