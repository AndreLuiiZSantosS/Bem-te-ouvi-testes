interface MusicaHorizontalProps {
  id: number;
  titulo: string;
  genero: string;
  imagem_capa?: string;
  musico_nome?: string;
  audio?: string;
}

export default function MusicaHorizontal({
  titulo,
  genero,
  imagem_capa,
  musico_nome,
  audio,
}: MusicaHorizontalProps) {
  const handlePlay = () => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  };

  return (
    <div className="flex flex-row items-center gap-0.5 w-[20.63rem] h-12 bg-[#FFFFFF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-md p-2">

      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={imagem_capa || '/imgNull.png'}
          alt={titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#D43F5D] truncate">{titulo}</p>
        <p className="text-xs text-[#D43F5D] truncate">
          {musico_nome || genero}
        </p>
      </div>

      {/* {audio && (
        <button
          onClick={handlePlay}
          className="flex-shrink-0 p-2 hover:bg-rose-100 rounded transition"
          title="Ouvir"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 1C1.4 1 1 1.4 1 2V14C1 14.6 1.4 15 2 15C2.6 15 3 14.6 3 14V2C3 1.4 2.6 1 2 1ZM5 4.5L12 8L5 11.5V4.5Z"
              fill="#D43F5D"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}