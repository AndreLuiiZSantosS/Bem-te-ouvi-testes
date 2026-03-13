interface NomeItemPlaylistProps{
    nome:string;
}

export default function NomeItemPlaylist({nome}:NomeItemPlaylistProps){
    return(
        <span 
        className="text-[0.875rem] text-[#D43F5D] cursor-pointer
        relative inline-block
         after:content-[''] after:absolute after:left-0 after:bottom-[2px]
         after:h-[2px] after:w-0 after:bg-current
         after:transition-all after:duration-300
         hover:after:w-full">{nome}
        </span>
    )
}