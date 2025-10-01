// Abrir modal
document.getElementById('abrirModal').addEventListener('click', function () {
    const modal = document.getElementById('modalPlaylist');
    modal.hidden = false;
});

// Fechar modal pelo botão "x"
document.getElementById('fecharModal').addEventListener('click', function () {
    const modal = document.getElementById('modalPlaylist');
    modal.hidden = true;
});

// Fechar modal pelo botão cancelar
document.getElementById('cancelarModal').addEventListener('click', function () {
    const modal = document.getElementById('modalPlaylist');
    modal.hidden = true;
});

// Fechar modal clicando fora do conteúdo
window.addEventListener('click', function (event) {
    const modal = document.getElementById('modalPlaylist');
    if (event.target === modal) {
        modal.hidden = true;
    }
});

// Toggle músicas
function toggleMusicas(id) {
    const container = document.getElementById('musicas-' + id);
    if (container.hidden) {
        container.hidden = false;
    } else {
        container.hidden = true;
    }
}

// Excluir playlist
function excluirPlaylist(id) {
    if (confirm('Tem certeza que deseja excluir essa playlist?')) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/playlist/${id}/excluir/`;  // ajuste conforme sua URL

        // Obter csrf token do body data attribute
        const csrfToken = document.body.dataset.csrf;

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        document.body.appendChild(form);
        form.submit();
    }
}

document.querySelectorAll('.playlist-toggle').forEach(button => {
    button.addEventListener('click', () => {
        // Pega o id do container pelo aria-controls
        const containerId = button.getAttribute('aria-controls');
        const container = document.getElementById(containerId);

        if (!container) return;

        // Toggle usando a propriedade hidden
        container.hidden = !container.hidden;

        // Atualiza o aria-expanded para acessibilidade
        const isExpanded = !container.hidden;
        button.setAttribute('aria-expanded', isExpanded.toString());
    });
});

function abrirModalAdicionarMusicas(playlistId) {
    const modal = document.getElementById('modalAdicionarMusicas');
    document.getElementById('playlistIdInput').value = playlistId;
    modal.hidden = false;
}

function fecharModalAdicionarMusicas() {
    document.getElementById('modalAdicionarMusicas').hidden = true;
}


