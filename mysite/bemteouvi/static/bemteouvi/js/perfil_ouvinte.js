document.addEventListener('DOMContentLoaded', function () {
  function inicializarPerfilOuvinte() {
    const btn = document.getElementById('btn-editar-perfil-ouvinte');
    const modal = document.getElementById('modal-edicao-ouvinte');
    const form = document.getElementById('formulario-edicao-ouvinte');

    if (!btn || !modal || !form) return;

    btn.addEventListener('click', function () {
      modal.style.display = 'block';

      const cancelar = modal.querySelector('.botao-cancelar');
      if (cancelar) {
        cancelar.onclick = () => {
          modal.style.display = 'none';
        };
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      fetch('/ouvinte/editar/', {  // ajuste a URL conforme sua rota
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': formData.get('csrfmiddlewaretoken')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Perfil atualizado com sucesso!');
          modal.style.display = 'none';
          location.reload();
        } else {
          alert('Erro ao salvar. Verifique os campos.');
          console.log(data.errors);
        }
      });
    });
  }

  inicializarPerfilOuvinte();

  document.body.addEventListener('htmx:afterSwap', function(evt) {
    if (evt.target === document.querySelector('main')) {
      inicializarPerfilOuvinte();
    }
  });
});
