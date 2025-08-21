// === Inicializador do Index (carrossel + botão de favoritar) ===
function inicializarIndex() {
  // --- Carrossel ---
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    let isDragging = false;
    let startX, scrollLeft;

    const stopDragging = () => {
      isDragging = false;
      carousel.classList.remove('dragging');
    };

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.classList.add('dragging');
    });

    carousel.addEventListener('mouseleave', stopDragging);
    carousel.addEventListener('mouseup', stopDragging);
    document.addEventListener('mouseup', stopDragging);

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });

  // --- Botão de Favoritar ---
  const favoriteBtns = document.querySelectorAll('.favoriteBtn');

  favoriteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      // Aqui você pode também fazer um fetch para atualizar o backend
    });
  });
}

// === Inicializador do Perfil do Músico ===
function inicializarPerfilMusico() {
  const btn = document.getElementById('btn-editar-perfil-musico');
  const modal = document.getElementById('modal-edicao-musico');
  const form = document.getElementById('formulario-edicao');

  if (!btn || !modal || !form) return;

  btn.addEventListener('click', function () {
    document.getElementById('nome-usuario-musico').value = '';
    document.getElementById('email-usuario-musico').value = '';
    document.getElementById('chave-pix').value = '';

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

    fetch('/musico/editar/', {
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

// === Inicializador do Perfil do Ouvinte ===
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

    fetch('/ouvinte/editar/', {
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

// === Chamada automática dos inicializadores ===
document.addEventListener('DOMContentLoaded', () => {
  inicializarIndex();
  inicializarPerfilMusico();
  inicializarPerfilOuvinte();
});

document.body.addEventL
