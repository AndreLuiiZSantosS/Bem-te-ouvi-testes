interface ImagemItemPlaylistProps{
    capa:string;
}

export default function ImagemItemPlaylist({capa}:ImagemItemPlaylistProps){
    return(
        <img src={capa} alt="Capa de álbum/single" 
        className="size-[3.125rem] rounded-[0.313rem]"/>
    )
}