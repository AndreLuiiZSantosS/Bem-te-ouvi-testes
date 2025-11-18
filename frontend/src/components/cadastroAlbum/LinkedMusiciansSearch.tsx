import React from 'react';
import MusicianListItem from './MusicianListItem';

interface Musician {
  id: number;
  name: string;
  avatar: string;
}

interface LinkedMusiciansListProps {
  musicians: Musician[];
  onRemoveMusician: (id: number) => void;
}

const LinkedMusiciansList: React.FC<LinkedMusiciansListProps> = ({ musicians, onRemoveMusician }) => {
  if (!musicians || musicians.length === 0) return null;

  const currentUser = musicians[0];
  const featuredMusicians = musicians.slice(1);

  return (
    <div className="">
      <h3 className="text-[#888888]">músico(s) vinculados:</h3>
      <div className="bg-white border border-[#e5e7eb] rounded-[0.2rem] p-2">
        {/* Renderiza o usuário atual */}
        <div className="mb-1">
          <MusicianListItem
            avatarSrc={currentUser.avatar}
            name={currentUser.name}
            subtitle="(Você)"
          />
        </div>

        {/* Renderiza os outros músicos */}
        {featuredMusicians.map((musician) => (
          <div key={musician.id} className="mb-1">
            <MusicianListItem
              avatarSrc={musician.avatar}
              name={musician.name}
            >
              <button
                className="text-[#d43f5d] px-2 py-1 group-hover:text-[#5C1B35] hover:text-[#5C1B35]"
                onClick={(e) => { e.stopPropagation(); onRemoveMusician(musician.id); }}
              >
                excluir
              </button>
            </MusicianListItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedMusiciansList;