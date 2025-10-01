// quando selecionado "Músico", exibe campos adicionais
document.addEventListener('DOMContentLoaded', function () {
    const tipoSelect = document.getElementById('tipo_usuario');
    const camposMusico = document.getElementById('campos-musico');

    function toggleCamposMusico() {
        if (tipoSelect.value === 'musico') {
            camposMusico.style.display = 'block';
        } else {
            camposMusico.style.display = 'none';
            // Limpa os campos ao esconder para evitar envio sem querer
            document.getElementById('id_cpf').value = '';
            document.getElementById('id_chave_pix').value = '';
        }
    }

    tipoSelect.addEventListener('change', toggleCamposMusico);

    // Inicializa ao carregar (caso venha com valor preenchido)
    toggleCamposMusico();
});
