import type { TypeEvento } from "../../types/typesModelos";

interface PropsEvento {
  evento: TypeEvento;
}

export default function Evento({ evento }: PropsEvento) {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  };

  return (
    <div className="flex flex-col gap-[5px] w-[200px] cursor-pointer">
      <img
        src={evento.imagem_do_evento || "/imagemEvento.png"}
        alt={evento.nome}
        className="w-[200px] h-[150px] rounded-[10px] object-cover"
      />
      <div className="flex flex-col leading-none gap-[3px]">
        <span className="text-[13px] text-[#D43F5D] font-semibold truncate">
          {evento.nome}
        </span>
        <span className="text-[11px] text-[#D43F5D] line-clamp-2">
          {evento.endereco}
        </span>
        <span className="text-[10px] text-[#D43F5D]">
          {formatarData(evento.data_do_evento)}
        </span>
      </div>
    </div>
  );
}
