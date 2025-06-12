// Sistema de exclusão de músicas
document.querySelectorAll('.botao-excluir').forEach(button => {
    button.addEventListener('click', function() {
        const musicaItem = this.closest('.item-musica');
        const musicaNome = musicaItem.querySelector('.titulo-musica').textContent;
        
        if(confirm(`Tem certeza que deseja excluir "${musicaNome}"?`)) {
            musicaItem.style.opacity = '0';
            musicaItem.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                musicaItem.remove();
                showNotification(`"${musicaNome}" foi excluída com sucesso!`);
            }, 300);
        }
    });
});

// Sistema de notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '100px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#1b263b';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    notification.style.zIndex = '1001';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============== SISTEMA DO MODAL ==============

const modalMusico = {
    init() {
        console.log("modalMusico.init() chamado!");

        this.modalElement = document.querySelector('.modal-edicao');
        this.openBtn = document.querySelector('.botao-editar-foto');
        this.closeBtns = document.querySelectorAll('.botao-cancelar');
        this.fotoPerfilInput = document.getElementById('input-foto-perfil');
        this.fotoCapaInput = document.getElementById('input-foto-capa');

        if (this.openBtn) {
            this.openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Botão de editar foto clicado");
                this.abrirModal();
            });
        } else {
            console.warn("⚠️ Botão .botao-editar-foto não encontrado!");
        }

        this.closeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.fecharModal());
        });

        document.addEventListener('click', (e) => {
            if (e.target === this.modalElement) this.fecharModal();
        });

        document.getElementById('formulario-edicao').addEventListener('submit', (e) => this.salvarAlteracoes(e));
        this.fotoPerfilInput.addEventListener('change', (e) => this.previewImage(e));
        this.fotoCapaInput.addEventListener('change', (e) => this.previewImage(e));

        document.getElementById('remover-foto-perfil').addEventListener('click', () => {
            localStorage.removeItem('fotoPerfil');
            document.querySelector('.foto-perfil').src = 'imagens/profile-icon.png';
            document.getElementById('input-foto-perfil').value = '';
        });

        document.getElementById('remover-foto-capa').addEventListener('click', () => {
            localStorage.removeItem('fotoCapa');
            document.querySelector('.imagem-capa').src = 'imagens/image3.png';
            document.getElementById('input-foto-capa').value = '';
        });

        this.carregarDadosSalvos();
    },

    abrirModal() {
        console.log("abrirModal() chamado");
        this.modalElement.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    fecharModal() {
        console.log("fecharModal() chamado");
        this.modalElement.style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    previewImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            if (e.target === this.fotoPerfilInput) {
                document.querySelector('.foto-perfil').src = event.target.result;
                localStorage.setItem('fotoPerfil', event.target.result);
            } else if (e.target === this.fotoCapaInput) {
                document.querySelector('.imagem-capa').src = event.target.result;
                localStorage.setItem('fotoCapa', event.target.result);
            }
        };

        if (file) reader.readAsDataURL(file);
    },

    salvarAlteracoes(e) {
        e.preventDefault();
        const novoNome = document.getElementById('nome-usuario').value;
        document.querySelector('.informacoes-perfil h1').textContent = novoNome;
        localStorage.setItem('nomeUsuario', novoNome);
        this.fecharModal();
    },

    carregarDadosSalvos() {
        const nomeSalvo = localStorage.getItem('nomeUsuario');
        const nomeEl = document.querySelector('.informacoes-perfil h1');
        const inputNome = document.getElementById('nome-usuario');

        if (nomeSalvo && nomeSalvo.trim() !== '') {
            nomeEl.textContent = nomeSalvo;
            inputNome.value = nomeSalvo;
        } else {
            nomeEl.textContent = "Nome do Musico";
            inputNome.value = "";
        }

        const fotoPerfil = localStorage.getItem('fotoPerfil');
        const perfilEl = document.querySelector('.foto-perfil');
        perfilEl.src = (fotoPerfil && fotoPerfil.trim() !== '') 
            ? fotoPerfil 
            : 'imagens/profile-icon.png';

        const fotoCapa = localStorage.getItem('fotoCapa');
        const capaEl = document.querySelector('.imagem-capa');
        capaEl.src = (fotoCapa && fotoCapa.trim() !== '') 
            ? fotoCapa 
            : 'imagens/image3.png';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    modalMusico.init();
});

// ============== PLAYER PADRONIZADO ==============
document.addEventListener('DOMContentLoaded', () => {
    // Dados da música "The Last Stand" com tempos sincronizados com o clipe oficial
    const sabatonData = {
        title: "The Last Stand",
        artist: "Sabaton",
        duration: 219, // Duração total em segundos
        lyrics: [
            // Tempos precisos sincronizados com o vídeo do YouTube
            { text: "In the heart of Holy See", time: 49.2 },
            { text: "In the home of Christianity", time: 53.0 },
            { text: "The seat of power is in danger", time: 57.1 },
            { text: "There's a foe of a thousand swords", time: 61.3 },
            { text: "They've been abandoned by their lords", time: 65.5 },
            { text: "Their fall from grace will pave their path, to damnation", time: 69.7 },
            { text: "Then the 189", time: 76.2 },
            { text: "In the service of heaven", time: 80.0 },
            { text: "They're protecting the holy line", time: 84.1 },
            { text: "It was 1527, gave their lives on the steps to heaven", time: 88.3 },
            { text: "Thy will be done!", time: 96.0 },
            { text: "For the grace, for the might of our lord", time: 100.2 },
            { text: "For the home of the holy", time: 104.4 },
            { text: "For the faith, for the way of the sword", time: 108.6 },
            { text: "Gave their lives so boldly", time: 112.8 },
            { text: "Come and tell the Swiss Guards story again", time: 120.8 },
            { text: "In the fight for the holy see", time: 125.2 },
            { text: "For the grace, for the might of the lord", time: 129.4 },
            { text: "In the name of his glory", time: 133.6 },
            { text: "For the faith, for the way of the sword", time: 137.8 },
            { text: "Come and tell their story again", time: 142.0 },
            { text: "Under guard of 42", time: 153.0 },
            { text: "Along a secret avenue", time: 157.2 },
            { text: "Castle Saint Angelo is waiting", time: 161.4 },
            { text: "They're the guard of the holy see", time: 165.6 },
            { text: "They're the guards of Christianity", time: 169.8 },
            { text: "The path through history is paved with salvation", time: 174.0 },
            { text: "Then the 189", time: 180.5 },
            { text: "In the service of heaven", time: 184.3 },
            { text: "They're protecting the holy line", time: 188.5 },
            { text: "It was 1527, gave their lives on the steps to heaven", time: 192.7 },
            { text: "Thy will be done!", time: 200.4 },
            { text: "For the grace, for the might of our lord", time: 204.6 },
            { text: "For the home of the holy", time: 208.8 },
            { text: "For the faith, for the way of the sword", time: 213.0 },
            { text: "Gave their lives so boldly", time: 217.2 },
            { text: "Come and tell the Swiss Guards story again", time: 225.4 },
            { text: "In the fight for the holy see", time: 229.6 },
            { text: "For the grace, for the might of the lord", time: 233.8 },
            { text: "In the name of his glory", time: 238.0 },
            { text: "For the faith, for the way of the sword", time: 242.2 },
            { text: "Come and tell their story again", time: 246.4 },
            { text: "Dying for salvation with dedication", time: 250.6 },
            { text: "No capitulation, annihilation", time: 254.8 },
            { text: "Papal commendation, reincarnation", time: 259.0 },
            { text: "Heaven is your destination", time: 263.0 }
        ]
    };

    // Referências aos elementos do DOM
    const player = document.getElementById('music-player');
    const playBtn = document.querySelector('.play-btn');
    const playIcon = playBtn.querySelector('i');
    const prevBtn = document.querySelector('.player-btn:nth-child(1)');
    const nextBtn = document.querySelector('.player-btn:nth-child(3)');
    const lyricsBtn = document.querySelector('.lyrics-btn');
    const lyricsModal = document.querySelector('.lyrics-modal');
    const lyricsContent = document.querySelector('.lyrics-content');
    const closeLyrics = document.getElementById('close-lyrics');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-container');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');
    const heartBtn = document.querySelector('.player-right .player-btn');
    
    // Estado do player
    let isPlaying = false;
    let isLiked = false;
    
    // Inicializar informações da música
    function loadSong() {
        trackTitle.textContent = sabatonData.title;
        trackArtist.textContent = sabatonData.artist;
        
        // Carregar letras
        loadLyrics();
    }
    
    // Carregar letras no modal
    function loadLyrics() {
        lyricsContent.innerHTML = '';
        sabatonData.lyrics.forEach(line => {
            const p = document.createElement('p');
            p.classList.add('lyrics-line');
            p.textContent = line.text;
            p.dataset.time = line.time;
            lyricsContent.appendChild(p);
        });
    }
    
    // Atualizar botão de like
    function updateLikeButton() {
        if (isLiked) {
            heartBtn.classList.remove('far');
            heartBtn.classList.add('fas', 'text-red-500');
        } else {
            heartBtn.classList.remove('fas', 'text-red-500');
            heartBtn.classList.add('far');
        }
    }
    
    // Controles do player
    function playSong() {
        isPlaying = true;
        player.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    }
    
    function pauseSong() {
        isPlaying = false;
        player.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
    
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Atualizar barra de progresso
    function updateProgress() {
        const progressPercent = (player.currentTime / player.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Destacar linha atual da letra
        const currentTime = player.currentTime;
        document.querySelectorAll('.lyrics-line').forEach(line => {
            line.classList.remove('active');
            const lineTime = parseFloat(line.dataset.time);
            
            // Destacar linha se o tempo atual estiver dentro de 1.5 segundos da linha
            if (Math.abs(currentTime - lineTime) < 1.5) {
                line.classList.add('active');
                
                // Rolagem automática no modal de letras
                if (lyricsModal.classList.contains('show')) {
                    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Definir progresso da música
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = player.duration;
        
        player.currentTime = (clickX / width) * duration;
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    
    player.addEventListener('timeupdate', updateProgress);
    
    progressContainer.addEventListener('click', setProgress);
    
    player.addEventListener('ended', () => {
        isPlaying = false;
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    });
    
    // Controles de letra
    lyricsBtn.addEventListener('click', () => {
        lyricsModal.classList.add('show');
    });
    
    closeLyrics.addEventListener('click', () => {
        lyricsModal.classList.remove('show');
    });
    
    // Controle de like
    heartBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        updateLikeButton();
    });
    
    // Botões de navegação (para demonstração)
    prevBtn.addEventListener('click', () => {
        showNotification("Música anterior");
    });
    
    nextBtn.addEventListener('click', () => {
        showNotification("Próxima música");
    });
    
    // Inicializar
    loadSong();
    updateLikeButton();

    // === CHAMADA DO MODAL  ===
    modalMusico.init();
});