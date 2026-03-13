import PlayerFavoritar from "./PlayerAcoes/PlayerFavoritar";
import PlayerPontos from "./PlayerAcoes/PlayerPontos";
import PlayerVolume from "./PlayerAcoes/PlayerVolume";

export default function PlayerAcoes(){
    return(
        <div className="flex flex-rol gap-[2.13rem] items-center">
            <PlayerFavoritar/>
            <PlayerVolume/>
            <PlayerPontos/>
        </div>
    );
}