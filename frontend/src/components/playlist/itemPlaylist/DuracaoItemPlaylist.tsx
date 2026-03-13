interface DuracaoItemPlaylistProps{
    duracao:string;
}

export default function DuracaoItemPlaylist({duracao}:DuracaoItemPlaylistProps){
    // TODO
    // refatorar o json que recebe os dados da duração para o parametro de MIN:SEC


    // function refatorarDuracao(){
    // }
    return(
        <span 
        className="text-[0.875rem] text-[#D43F5D]">{duracao}</span>
    );
}