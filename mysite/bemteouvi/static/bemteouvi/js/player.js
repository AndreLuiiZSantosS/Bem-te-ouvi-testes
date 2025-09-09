const audioElement = document.getElementById('audio-player');
const tituloMusica = document.getElementById('titulo-musica');
const botaoPlay = document.getElementById('botao-play');
const botaoNext = document.getElementById('botao-next');
const botaoPrev = document.getElementById('botao-prev');
const progressContainer = document.getElementById('player-progress');
const progressBar = document.getElementById('player-progress-bar');

let fila = [];
let indexAtual = 0;

function salvarEstado() {
  if (fila.length === 0) return;
  const estado = {
    fila,
    indexAtual,
    tempoAtual: audioElement.currentTime,
    pausado: audioElement.paused
  };
  localStorage.setItem('playerEstado', JSON.stringify(estado));
}

function carregarEstado() {
  const estadoStr = localStorage.getItem('playerEstado');
  if (!estadoStr) return false;
  try {
    const estado = JSON.parse(estadoStr);
    fila = estado.fila;
    indexAtual = estado.indexAtual;

    const audioUrlCompleta = new URL(fila[indexAtual].url, window.location.origin).href;

    if (audioElement.src !== audioUrlCompleta) {
      audioElement.src = audioUrlCompleta;
    }

    tituloMusica.textContent = fila[indexAtual].titulo;

    audioElement.addEventListener('loadedmetadata', () => {
      audioElement.currentTime = estado.tempoAtual || 0;
      if (!estado.pausado) {
        audioElement.play();
        botaoPlay.textContent = 'Pause';
      } else {
        botaoPlay.textContent = 'Play';
      }
    }, { once: true });

    return true;
  } catch {
    return false;
  }
}

function tocarMusicaAtual() {
  if (fila.length === 0) return;
  const musica = fila[indexAtual];
  audioElement.src = new URL(musica.url, window.location.origin).href;
  tituloMusica.textContent = musica.titulo;
  audioElement.play();
  botaoPlay.textContent = 'Pause';
  salvarEstado();
}

function ligarBotoesTocar() {
  const botoes = document.querySelectorAll('.botao-tocar');
  botoes.forEach((btn, index) => {
    btn.onclick = () => {
      fila = Array.from(botoes).map(b => ({
        url: b.dataset.audio,
        titulo: b.dataset.titulo
      }));
      indexAtual = index;
      tocarMusicaAtual();
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ligarBotoesTocar();

  botaoPlay.onclick = () => {
    if (audioElement.paused) {
      audioElement.play();
      botaoPlay.textContent = 'Pause';
    } else {
      audioElement.pause();
      botaoPlay.textContent = 'Play';
    }
    salvarEstado();
  };

  botaoNext.onclick = () => {
    if (fila.length === 0) return;
    indexAtual = (indexAtual + 1) % fila.length;
    tocarMusicaAtual();
  };

  botaoPrev.onclick = () => {
    if (fila.length === 0) return;
    indexAtual = (indexAtual - 1 + fila.length) % fila.length;
    tocarMusicaAtual();
  };

  // Atualizar a barra de progresso conforme a música toca
  audioElement.addEventListener('timeupdate', () => {
    if (!audioElement.duration) return;
    const progresso = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.style.width = `${progresso}%`;
  });

  // Permitir clicar na barra para mudar o tempo
  progressContainer.addEventListener('click', (e) => {
    const largura = progressContainer.clientWidth;
    const cliqueX = e.offsetX;
    const novoTempo = (cliqueX / largura) * audioElement.duration;
    audioElement.currentTime = novoTempo;
  });

  audioElement.addEventListener('ended', () => {
    if (fila.length === 0) return;
    indexAtual = (indexAtual + 1) % fila.length;
    tocarMusicaAtual();
  });

  carregarEstado();
});

document.body.addEventListener('htmx:afterSwap', () => {
  ligarBotoesTocar();
});
