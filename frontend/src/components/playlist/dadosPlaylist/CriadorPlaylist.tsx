interface CriadorPlaylistProps{
    perfilCriador:string;
    nomeCriador:string;
}

export default function CriadorPlaylist({perfilCriador, nomeCriador}:CriadorPlaylistProps){
    return(
        <div className="flex flex-row items-center">
            <span className="text-4xl text-[#D43F5D]">criada por</span>

            <img src={perfilCriador} alt="Imagem de perfil do criador da playlist"
            className="size-[2.188rem] rounded-full ml-3 mr-1.5"/>
            
            <span className="text-4xl text-[#D43F5D] italic">{nomeCriador}</span>
        </div>
    );
}