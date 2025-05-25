// ============== SISTEMA DO PLAYER ==============
const player = {
    currentTrack: 0,
    isPlaying: false,
    progressInterval: null,
    timeTrackingInterval: null,
    startTime: null,
    tracks: [
        {
            title: "Sinal Máximo",
            artist: "Não Amar Ver",
            duration: 180,
            albumArt: "https://via.placeholder.com/50",
            favorited: false
        },
        {
            title: "Todos",
            artist: "Toda Sobre",
            duration: 210,
            albumArt: "https://via.placeholder.com/50",
            favorited: true
        }
    ],
    
    init() {
        this.playBtn = document.querySelector('.botao-play');
        this.prevBtn = document.querySelector('.fa-step-backward').parentElement;
        this.nextBtn = document.querySelector('.fa-step-forward').parentElement;
        this.heartBtn = document.querySelector('.botao-favorito');
        this.progressBar = document.querySelector('.progresso');
        this.songTitle = document.querySelector('.controles-esquerda .titulo-musica');
        this.songArtist = document.querySelector('.controles-esquerda .artista');
        this.albumCover = document.querySelector('.capa-album');

        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.heartBtn.addEventListener('click', () => this.toggleFavorite());
        document.querySelector('.barra-progresso').addEventListener('click', (e) => this.seek(e));

        this.loadTrack();
    },

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const icon = this.playBtn.querySelector('i');
        icon.classList.toggle('fa-play');
        icon.classList.toggle('fa-pause');
        
        if(this.isPlaying) {
            this.startProgress();
            this.startTimeTracking();
        } else {
            this.pauseProgress();
            this.stopTimeTracking();
        }
    },

    startProgress() {
        let startTime = Date.now();
        const duration = this.tracks[this.currentTrack].duration;
        
        const updateProgress = () => {
            if(!this.isPlaying) return;
            
            const elapsed = (Date.now() - startTime) / 1000;
            const progress = (elapsed / duration) * 100;
            
            if(progress >= 100) {
                this.nextTrack();
                return;
            }
            
            this.progressBar.style.width = `${progress}%`;
            requestAnimationFrame(updateProgress);
        };
        
        requestAnimationFrame(updateProgress);
    },

    startTimeTracking() {
        this.startTime = Date.now();
        this.timeTrackingInterval = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            grafico.addPlayTime(elapsedSeconds);
            this.startTime = Date.now();
        }, 1000);
    },

    stopTimeTracking() {
        clearInterval(this.timeTrackingInterval);
    },

    pauseProgress() {
        this.isPlaying = false;
    },

    loadTrack() {
        const track = this.tracks[this.currentTrack];
        this.songTitle.textContent = track.title;
        this.songArtist.textContent = track.artist;
        this.albumCover.src = track.albumArt;
        this.progressBar.style.width = '0%';
        this.updateFavoriteState();
    },

    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack();
        if(this.isPlaying) this.togglePlay();
    },

    prevTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack();
        if(this.isPlaying) this.togglePlay();
    },

    toggleFavorite() {
        this.tracks[this.currentTrack].favorited = !this.tracks[this.currentTrack].favorited;
        this.updateFavoriteState();
        this.saveFavorites();
    },

    updateFavoriteState() {
        const track = this.tracks[this.currentTrack];
        this.heartBtn.classList.toggle('favoritado', track.favorited);
        this.heartBtn.querySelector('i').classList.toggle('far', !track.favorited);
        this.heartBtn.querySelector('i').classList.toggle('fas', track.favorited);
    },

    seek(e) {
        const barWidth = e.currentTarget.offsetWidth;
        const clickPosition = e.offsetX;
        const progress = (clickPosition / barWidth) * 100;
        this.progressBar.style.width = `${progress}%`;
    },

    saveFavorites() {
        const favorites = this.tracks
            .map((track, index) => track.favorited ? index : null)
            .filter(index => index !== null);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

// ============== SISTEMA DO GRÁFICO ==============
const grafico = {
    weeklyData: [0, 0, 0, 0, 0, 0, 0],
    currentDay: null,
    
    init() {
        this.barras = document.querySelectorAll('.barras div');
        this.diasElements = document.querySelectorAll('.dias span');
        this.loadWeeklyData();
        this.startDayCheck();
        this.updateChart();
    },

    getCurrentDay() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const gmt3 = new Date(utc + (3600000 * -3));
        return gmt3.getDay();
    },

    startDayCheck() {
        setInterval(() => {
            const newDay = this.getCurrentDay();
            if (newDay !== this.currentDay) {
                this.currentDay = newDay;
                this.checkWeeklyReset();
            }
        }, 60000);
    },

    checkWeeklyReset() {
        const now = new Date();
        const gmt3Time = new Date(now.getTime() + (3600000 * -3));
        if (gmt3Time.getDay() === 0 && gmt3Time.getHours() === 0 && gmt3Time.getMinutes() < 1) {
            this.weeklyData = [0, 0, 0, 0, 0, 0, 0];
            this.saveWeeklyData();
            this.updateChart();
        }
    },

    addPlayTime(seconds) {
        if (player.isPlaying) {
            const minutes = Math.floor(seconds / 60);
            this.weeklyData[this.currentDay] += minutes;
            this.saveWeeklyData();
            this.updateChart();
        }
    },

    updateChart() {
        const maxMinutes = Math.max(...this.weeklyData, 120);
        
        this.barras.forEach((barra, index) => {
            const minutos = this.weeklyData[index];
            const altura = (minutos / maxMinutes) * 100;
            
            barra.style.height = `${altura}%`;
            barra.dataset.value = `${minutos} min`;
            barra.style.backgroundColor = `hsl(168, 98%, ${80 - (altura/2)}%)`;
        });

        this.updateDayLabels();
    },

    updateDayLabels() {
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        this.diasElements.forEach((span, index) => {
            span.textContent = days[index];
        });
    },

    saveWeeklyData() {
        localStorage.setItem('weeklyData', JSON.stringify({
            data: this.weeklyData,
            timestamp: Date.now()
        }));
    },

    loadWeeklyData() {
        const savedData = localStorage.getItem('weeklyData');
        if (savedData) {
            const { data, timestamp } = JSON.parse(savedData);
            const oneWeek = 604800000;
            if (Date.now() - timestamp < oneWeek) {
                this.weeklyData = data;
            }
        }
        this.currentDay = this.getCurrentDay();
    }
};

// ============== SISTEMA DO MODAL ============== 
const modal = {
    init() {
        this.modalElement = document.querySelector('.modal-edicao');
        this.openBtn = document.querySelector('.botao-editar-foto');
        this.closeBtns = document.querySelectorAll('.botao-cancelar');
        this.fotoPerfilInput = document.getElementById('input-foto-perfil');
        this.fotoCapaInput = document.getElementById('input-foto-capa');
        
        this.openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.abrirModal();
        });
        
        this.closeBtns.forEach(btn => {
            btn.addEventListener('click', () => this.fecharModal());
        });

        document.addEventListener('click', (e) => {
            if(e.target === this.modalElement) this.fecharModal();
        });

        document.getElementById('formulario-edicao').addEventListener('submit', (e) => this.salvarAlteracoes(e));
        this.fotoPerfilInput.addEventListener('change', (e) => this.previewImage(e));
        this.fotoCapaInput.addEventListener('change', (e) => this.previewImage(e));
        
        this.carregarDadosSalvos();
    },

    abrirModal() {
        this.modalElement.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    fecharModal() {
        this.modalElement.style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    previewImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            if(e.target === this.fotoPerfilInput) {
                document.querySelector('.foto-perfil').src = event.target.result;
                localStorage.setItem('fotoPerfil', event.target.result);
            } else if(e.target === this.fotoCapaInput) {
                document.querySelector('.imagem-capa').src = event.target.result;
                localStorage.setItem('fotoCapa', event.target.result);
            }
        };
        
        if(file) reader.readAsDataURL(file);
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
        if(nomeSalvo) {
            document.querySelector('.informacoes-perfil h1').textContent = nomeSalvo;
            document.getElementById('nome-usuario').value = nomeSalvo;
        }
        
        const fotoPerfil = localStorage.getItem('fotoPerfil');
        if(fotoPerfil) document.querySelector('.foto-perfil').src = fotoPerfil;
        
        const fotoCapa = localStorage.getItem('fotoCapa');
        if(fotoCapa) document.querySelector('.imagem-capa').src = fotoCapa;
    }
};

// ============== INICIALIZAÇÃO GERAL ==============
document.addEventListener('DOMContentLoaded', () => {
    player.init();
    grafico.init();
    modal.init();
    
    // Carregar favoritos
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    savedFavorites.forEach(index => {
        if(player.tracks[index]) player.tracks[index].favorited = true;
    });
});