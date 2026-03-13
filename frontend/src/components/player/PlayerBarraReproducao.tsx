import PlayerBarraProgesso from "./PlayerBarraProgresso";
import PlayerControle from "./PlayerControle";

export default function PlayerBarraReproducao(){
    return(
        <div className="flex flex-col gap-3.5 items-center">
            <PlayerControle/>
            <PlayerBarraProgesso/>
        </div>
    );
}