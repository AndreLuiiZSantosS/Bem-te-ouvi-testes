import PlayerBarraProgesso from "./PlayerBarraProgresso";
import PlayerControle from "./PlayerControle";

export default function PlayerBarraReproducao(){
    return(
        <div className="flex flex-col gap-[15px] items-center">
            <PlayerControle/>
            <PlayerBarraProgesso/>
        </div>
    );
}