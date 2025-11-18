import PlayerAvancar from "./PlayerControle/PlayerAvancar";
import PlayerOuvirOUPausar from "./PlayerControle/PlayerOuvirOUPausar";
import PlayerRetroceder from "./PlayerControle/PlayerRetroceder";

export default function PlayerControle(){
    return(
        <div className="flex flex-rol gap-[61px] items-center">
            <PlayerRetroceder/>

            <PlayerOuvirOUPausar/>

            <PlayerAvancar/>
        </div>
    );
}