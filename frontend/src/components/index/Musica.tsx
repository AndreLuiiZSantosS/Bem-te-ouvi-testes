export default function Musica(){
    return(
        <div className="flex flex-col gap-[5px] w-[150px]">
            <img src="/imagemMusica.png" alt="" className="w-[150px] h-[150px] rounded-[10px]"/>
            <div className="flex flex-col leading-none gap-[2px]">
                <span className="text-[13px] text-[#D43F5D]">nomeMusica </span>
                <div className="flex flex-row justify-between">
                    <span className="text-[10px] text-[#D43F5D]"><i>nomeCantor</i></span>
                    <span className="text-[10px] text-[#D43F5D]">00:00</span>
                </div>
            </div>
        </div>
    );
}

// import {imagemAlbum} from ;

// interface MusicaProps{
//     nomeMusica:string;
//     nomeCantor:string;
//     tempoMinuto:number;
//     tempoSegundo:number;
// }


// export default function Musica({nomeMusica , nomeCantor, tempoMinuto, tempoSegundo}:MusicaProps){
//     return(
//         <div className="flex flex-col gap-[5px] w-[150px]">
//             <img src="{imagemAlbum}" alt="" className="w-[150px] h-[150px] rounded-[10px]"/>
//             <div className="flex flex-col leading-none gap-[2px]">
//                 <span className="text-[13px] text-[#D43F5D]">{nomeMusica}</span>
//                 <div className="flex flex-row justify-between">
//                     <span className="text-[10px] text-[#D43F5D]"><i>{nomeCantor}</i></span>
//                     <span className="text-[10px] text-[#D43F5D]">{tempoMinuto}:{tempoSegundo}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

