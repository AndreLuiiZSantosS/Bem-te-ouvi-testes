import imagemGenericaPlaylist from "../../../assets/imagemGenericaPlaylist.png"

interface ImagemPlaylistProps{
    capa?:string | null;
}

export default function ImagemPlaylist({capa}:ImagemPlaylistProps){
    //TODO
    //remover variavel capa = null, manter apenas a condição no if
    capa = null; //temporario para teste
    if(capa == null){
       return(
            <img src={imagemGenericaPlaylist} alt="Capa genérica para playlists" 
            className="size-[15.625rem] border-2 border-[#D43F5D]"/>
       ) 
    }else{
        return(
            <img src={capa} alt="Capa da Playlist" 
            className="size-[15.625rem] "/>
        );
    }
}