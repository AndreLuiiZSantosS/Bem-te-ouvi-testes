import React, { useState, useEffect } from 'react';
import LinkedMusiciansList from './LinkedMusiciansSearch';
import MusicianSearch from './MusiciansSearch';

interface Musician {
  id: number;
  name: string;
  avatar: string;
}

// Simulação de dados do usuário logado
const currentUser: Musician = { 
  id: 1, 
  name: 'Rythm', 
  avatar: 'url/avatar1.jpg' 
};

const AlbumMusiciansManager: React.FC = () => {
  // O ESTADO (a "fonte da verdade") vive aqui, no componente pai.
  const [linkedMusicians, setLinkedMusicians] = useState<Musician[]>([]);

  // Quando o componente carrega, define o usuário atual como o primeiro da lista.
  useEffect(() => {
    setLinkedMusicians([currentUser]);
  }, []);

  // FUNÇÃO PARA ADICIONAR UM MÚSICO (será passada para o MusicianSearch)
  const handleAddMusician = (musicianToAdd: Musician): void => {
    // Lógica para não adicionar músicos duplicados
    if (!linkedMusicians.some(m => m.id === musicianToAdd.id)) {
      setLinkedMusicians([...linkedMusicians, musicianToAdd]);
    }
  };

  // FUNÇÃO PARA REMOVER UM MÚSICO (será passada para o LinkedMusiciansList)
  const handleRemoveMusician = (musicianIdToRemove: number): void => {
    // Não permite remover o usuário atual (regra de negócio)
    if (musicianIdToRemove === currentUser.id) return; 
    console.log('Removendo músico com id:', musicianIdToRemove);
    setLinkedMusicians((prev) => prev.filter(m => m.id !== musicianIdToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Componente de Lista:
        - Recebe a lista completa de músicos para exibir.
        - Recebe a função para remover um músico.
      */}
      <LinkedMusiciansList 
        musicians={linkedMusicians} 
        onRemoveMusician={handleRemoveMusician} 
      />

      {/* Componente de Busca:
        - Recebe a função para adicionar um novo músico.
        - Recebe a lista de músicos já adicionados para evitar duplicatas.
      */}
      <MusicianSearch 
        onAddMusician={handleAddMusician}
        alreadyLinkedIds={linkedMusicians.map(m => m.id)} // Passa só os IDs
      />
    </div>
  );
};

export default AlbumMusiciansManager;