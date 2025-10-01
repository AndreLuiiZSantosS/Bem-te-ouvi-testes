function inicializarPerfilMusico() {
  const btn = document.getElementById('btn-editar-perfil-musico');
  const modal = document.getElementById('modal-edicao-musico');
  const form = document.getElementById('formulario-edicao');

  if (!btn || !modal || !form) return;

  btn.addEventListener('click', function () {
    // Preencher campos com dados atuais do músico (você pode passar do backend para o template)
    document.getElementById('nome-usuario-musico').value = '';
    document.getElementById('email-usuario-musico').value = '';
    document.getElementById('chave-pix').value = '';

    modal.style.display = 'block';

    document.querySelector('.botao-cancelar').onclick = () => {
      modal.style.display = 'none';
    };
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch('/musico/editar/', {  // ajuste a URL para sua rota de edição de músico
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

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', inicializarPerfilMusico);

// Inicializa após cada troca de conteúdo HTMX
document.body.addEventListener('htmx:afterSwap', function(evt) {
  if (evt.target === document.querySelector('main')) {
    inicializarPerfilMusico();
  }
});
