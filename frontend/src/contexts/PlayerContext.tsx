import { createContext, useContext, useState, useRef} from 'react';
import type {ReactNode} from 'react';

interface PlayerContextData {
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  duration: number;
  progress: number;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  handleSeek: (value: number) => void;
}

const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration;
    }
  };

  return (
    <PlayerContext.Provider 
      value={{
        isPlaying,
        togglePlay,
        currentTime,
        duration,
        progress,
        audioRef,
        handleSeek
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src="/musica.mp3"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);