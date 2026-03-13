import PlayerAvancar from "./PlayerControle/PlayerAvancar";
import PlayerOuvirOUPausar from "./PlayerControle/PlayerOuvirOUPausar";
import PlayerRetroceder from "./PlayerControle/PlayerRetroceder";

export default function PlayerControle(){
    return(
        <div className="flex flex-rol gap-16 items-center">
            <PlayerRetroceder/>

            <PlayerOuvirOUPausar/>

            <PlayerAvancar/>
        </div>
    );
}