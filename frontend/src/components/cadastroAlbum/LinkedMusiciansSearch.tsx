import React from 'react';
import MusicianListItem from './MusicianListItem';

interface Musician {
  id: number;
  nome_artistico: string;
  foto_perfil: string | null; // Pode vir nulo do banco
}

interface LinkedMusiciansListProps {
  musicians: Musician[];
  onRemoveMusician: (id: number) => void;
}

const LinkedMusiciansList: React.FC<LinkedMusiciansListProps> = ({ musicians, onRemoveMusician }) => {
  // Se não tiver músicos, retorna null
  if (!musicians || musicians.length === 0) return null;

  // Função auxiliar para montar a URL correta da imagem
  const getImageUrl = (path: string | null) => {
    // 1. Se não tiver imagem, retorna uma imagem padrão (coloque essa imagem na pasta 'public')
    if (!path) return '/avatar-default.png'; 

    // 2. Se a URL já começar com http (ex: imagem externa ou S3), usa ela mesma
    if (path.startsWith('http')) return path;

    // 3. Se for um caminho relativo do Django (ex: /media/...), adiciona o domínio do backend
    return `http://localhost:8000${path}`;
  };

  return (
    <div className="">
      <h3 className="text-[#888888] mb-2">músico(s) vinculados:</h3>
      <div className="bg-white border border-[#e5e7eb] rounded-[0.2rem] p-2">
        
        {musicians.map((musician) => (
          <div key={musician.id} className="mb-1">
            <MusicianListItem
              // AQUI ESTÁ A CORREÇÃO: Usamos a função para tratar a URL
              foto_perfil={getImageUrl(musician.foto_perfil)}
              nome_artistico={musician.nome_artistico || "Músico sem nome"}
            >
            </MusicianListItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinkedMusiciansList;