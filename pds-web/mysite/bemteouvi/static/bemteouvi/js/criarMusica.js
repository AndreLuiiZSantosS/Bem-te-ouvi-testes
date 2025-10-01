function inicializarPreviewCriarMusica() {
  const imagemInput = document.getElementById('imagemMusica');
  const imagemPreview = document.getElementById('previewImagem');
  if (imagemInput && imagemPreview) {
    imagemInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagemPreview.innerHTML = `<img src="${e.target.result}"/>`;
        };
        reader.readAsDataURL(file);
      } else {
        imagemPreview.innerHTML = '';
      }
    });
  }

  const audioInput = document.getElementById('audioMusica');
  const audioPreview = document.getElementById('previewAudio');
  if (audioInput && audioPreview) {
    audioInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file && file.type.startsWith('audio/')) {
        const audioURL = URL.createObjectURL(file);
        audioPreview.src = audioURL;
        audioPreview.style.display = 'block';
      } else {
        audioPreview.style.display = 'none';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', inicializarPreviewCriarMusica);

document.body.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.target === document.querySelector('main')) {
    inicializarPreviewCriarMusica();
  }
});