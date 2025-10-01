function inicializarPreviewCriarEvento() {
  const imagemInput = document.getElementById('fotoEvento'); // Corrigido para 'fotoEvento'
  const imagemPreview = document.getElementById('previewEvento'); // Corrigido para 'previewEvento'
  if (imagemInput && imagemPreview) {
    imagemInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagemPreview.innerHTML = `<img src="${e.target.result}" style="max-width: 200px; max-height: 200px;" />`;
        };
        reader.readAsDataURL(file);
      } else {
        imagemPreview.innerHTML = '';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', inicializarPreviewCriarEvento);

document.body.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.target === document.querySelector('main')) {
    inicializarPreviewCriarEvento();
  }
});