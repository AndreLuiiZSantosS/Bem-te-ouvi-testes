import { usePlayer } from "../../contexts/PlayerContext";

export default function PlayerConteudoMusica() {
  const { musicaAtual } = usePlayer();

  if (!musicaAtual) {
    return <span className="text-[#D43F5D]">Nenhuma música tocando</span>;
  }

  const album = musicaAtual.album_info;
  const musico = album.musicos[0];

  return (
    <div className="flex flex-row gap-[13px]">
      <img
        src={album.imagem_capa}
        alt={album.titulo}
        className="rounded-[5px] w-[80px] h-[80px]"
      />

      <div className="flex flex-col mt-[0.56rem] leading-none gap-1">
        <span className="text-2xl text-[#D43F5D]">
          {musicaAtual.titulo}
        </span>

        <span className="text-[1.25rem] text-[#D43F5D] italic">
          {musico.nome_artistico}
        </span>
      </div>
    </div>
  );
}