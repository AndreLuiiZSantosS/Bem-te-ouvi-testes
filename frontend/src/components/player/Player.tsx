import PlayerAcoes from "./PlayerAcoes";
import PlayerBarraReproducao from "./PlayerBarraReproducao"
import PlayerConteudoMusica from "./PlayerConteudoMusica"

export default function Player(){
    return(
        <div className="
        flex flex-row items-center justify-between 
        w-full h-30 bg-[#FAFAFA]
        pl-6.5 pr-6.5 pt-4.5 pb-4.5
        border-t border-[#D43F5D]">
            <PlayerConteudoMusica/>
            <PlayerBarraReproducao/>
            <PlayerAcoes/>
        </div>
    );
}

