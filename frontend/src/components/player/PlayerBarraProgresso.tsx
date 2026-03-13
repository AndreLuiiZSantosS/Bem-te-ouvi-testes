import { usePlayer } from '../../contexts/PlayerContext';

export default function PlayerBarraProgesso(){
    const { currentTime, duration, progress, handleSeek } = usePlayer();

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return(
        <div className="flex flex-rol gap-2.5 items-center">
            <span className="text-[#D43F5D] text-[1.25rem]">{formatTime(currentTime)}</span>
            <div className="
            w-[35rem] h-2.5 
            bg-[#D9D9D9] rounded-[0.625rem] cursor-pointer"
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedValue = (x / rect.width) * 100;
                handleSeek(clickedValue);
            }}
            >
                <div className="h-2.5 bg-[#D43F5D] rounded-[0.625rem] transition-all duration-150"
                style={{ width: `${progress}%` }}
                />
            </div>

            <span className="text-[#D43F5D] text-[1.25rem]">{formatTime(duration)}</span>
        </div>
    );
}


