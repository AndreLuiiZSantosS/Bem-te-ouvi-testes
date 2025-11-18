import { usePlayer } from '../../contexts/PlayerContext';

export default function PlayerBarraProgesso(){
    const { currentTime, duration, progress, handleSeek } = usePlayer();

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return(
        <div className="flex flex-rol gap-[10px] items-center">
            <span className="text-[#D43F5D] text-[20px]">{formatTime(currentTime)}</span>
            <div className="
            w-[560px] h-[10px] 
            bg-[#D9D9D9] rounded-[10px] cursor-pointer"
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedValue = (x / rect.width) * 100;
                handleSeek(clickedValue);
            }}
            >
                <div className="h-[10px] bg-[#D43F5D] rounded-[10px] transition-all duration-150"
                style={{ width: `${progress}%` }}
                />
            </div>

            <span className="text-[#D43F5D] text-[20px]">{formatTime(duration)}</span>
        </div>
    );
}


