interface TituloPlaylistProps{
    titulo:string;
}

export default function TituloPlaylist({titulo}:TituloPlaylistProps){
    return(
        <span className="text-[4rem] text-[#D43F5D]">{titulo}</span>
    );
}