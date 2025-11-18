import PlayerAcoes from "./PlayerAcoes";
import PlayerBarraReproducao from "./PlayerBarraReproducao"
import PlayerConteudoMusica from "./PlayerConteudoMusica"

export default function Player(){
    return(
        <div className="
        flex flex-row items-center justify-between 
        w-full h-[120px] bg-[#FAFAFA]
        pl-[26px] pr-[26px] pt-[18px] pb-[18px]
        border-t border-[#D43F5D]">
            <PlayerConteudoMusica/>
            <PlayerBarraReproducao/>
            <PlayerAcoes/>
        </div>
    );
}

