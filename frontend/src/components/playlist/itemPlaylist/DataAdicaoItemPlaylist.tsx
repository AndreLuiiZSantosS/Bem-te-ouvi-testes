interface DataAdicaoItemPlaylistProps{
    data:string;
}

export default function DataAdicaoItemPlaylist({data}:DataAdicaoItemPlaylistProps){
    // TODO
    // refatorar o json que recebe os dados da duração para o parametro de MIN:SEC

    
    // function refatorarData(){
    // }
    return(
        <span 
        className="text-[0.875rem] text-[#D43F5D]">{data}</span>
    );
}





