export default function Playlist(){
    return(
        <div className="flex flex-col gap-[5px]">
            <img src="/imagemAlbum.png" alt="" className="w-[150px] h-[150px]"/>
            <div className="flex flex-col leading-none gap-[2px]">
                <span className="text-[13px] text-[#D43F5D]">nomeAlbum</span>
                <span className="text-[10px] text-[#D43F5D]">XX faixas</span>
            </div>
        </div>
    );
}

// import {imagemAlbum} from ;

// interface PlaylistProps{
//     nomeAlbum:string;
//     numeroFaixas:number;
// }

// export default function Playlist({nomeAlbum, numeroFaixas}:PlaylistProps){
//     return(
//         <div className="flex flex-col gap-[5px]">
//             <img src="{imagemAlbum}" alt="" className="w-[150px] h-[150px]"/>
//             <div className="flex flex-col leading-none gap-[2px]">
//                 <span className="text-[13px] text-[#D43F5D]">{nomeAlbum}</span>
//                 <span className="text-[10px] text-[#D43F5D]">{numeroFaixas} faixas</span>
//             </div>
//         </div>
//     );
// }