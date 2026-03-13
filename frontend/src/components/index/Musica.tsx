import { usePlayer } from "../../contexts/PlayerContext";
import type TypeMusica from "../../types/typesModelos";

interface PropsMusica {
  musica: TypeMusica;
  onPlay: () => void;
}

export default function Musica({ musica, onPlay }: PropsMusica) {
  const { setMusicaAtual } = usePlayer();

  const handleMusicaClick = () => {
    // 1. Atualiza o player no frontend
    setMusicaAtual(musica);
    
    // 2. Dispara a função que chama o endpoint do Observer no backend
    if (onPlay) {
      onPlay();
    }
  };

  return (
    <div 
      className="flex flex-col gap-[5px] w-[150px] cursor-pointer hover:scale-105 transition-transform"
      onClick={handleMusicaClick}
    >
      <img
        src={musica.album_info.imagem_capa || "/imagemMusica.png"}
        alt={musica.titulo}
        className="w-[150px] h-[150px] rounded-[10px] object-cover"
      />
      <div className="flex flex-col leading-none gap-[2px]">
        <span className="text-[13px] font-bold text-[#D43F5D]">{musica.titulo}</span>
        <div className="flex flex-row justify-between">
          <span className="text-[10px] text-[#D43F5D]">
            <i>{musica.album_info.musicos[0]?.nome_artistico || "Artista"}</i>
          </span>
          <span className="text-[10px] text-[#D43F5D]">
            {musica.duracao_formatada || "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
}
