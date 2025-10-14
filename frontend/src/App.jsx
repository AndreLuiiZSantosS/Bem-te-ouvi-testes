import React from "react";
import Playlist from "./components/Playlist";
import Musicos from "./components/Musicos";
import { PublishMusicForm } from "./components/PublishMusicForm";
import { FormContainer } from "./components/FormContainer";


function App() {
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h3>ultimas playlists, albuns e musicas ouvidos na página<br></br> 
        inicial, playlist e pagina de perfil de ouvinte</h3>
        <Playlist />

        <h3 style={{ marginTop: '2rem' }}>Músicos na página principal</h3>
        <Musicos/>
      </div>

      <FormContainer>
        <PublishMusicForm />
      </FormContainer>
    </>
  );
}

export default App;