import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Playlist from "./components/Playlist";
import Musicos from "./components/Musicos";
import Button from "./components/Button";
import AlbumMusiciansManager from "./components/cadastroAlbum/AlbumMusiciansManager";
import AudioUpload from "./components/cadastroAlbum/AudioUpload";
import ImageUpload from "./components/ImageUpload";
import Title from "./components/Title";
// import MigalhaPao from './components/MigalhaPao'
// import InputGenerico from './components/InputGenerico'
// import SelectGenerico from './components/SelectGenerico'
// import TextAreaGenerico from './components/TextAreaGenerico'
// import LabelGenerico from './components/LabelGenerico'

import Auth from "./components/Auth";

function App() {
  const handleBotaoVoltarClick = () => {
    // Lógica para o botão de voltar
  };

  const PaginaPrincipal = () => (
    <div>
      <Playlist />
      <Musicos />
      <Button text="Voltar" onClick={handleBotaoVoltarClick} />
      <AlbumMusiciansManager />
      <AudioUpload />
      <ImageUpload />
      <Title iconSrc="/icons/playlist-icon.svg" text="Minha Playlist" />
    </div>
  );

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth mode="login" />} />
        <Route path="/paginaInicial" element={<PaginaPrincipal />} />
      </Routes>
    </BrowserRouter>
    // <MigalhaPao caminhos={[{ nome: 'Início', link: '/' }, { nome: 'Playlists', link: '/playlists' }, { nome: 'Minha Playlist' }]} />
    // <InputGenerico label="Nome do Álbum" placeholder="Digite o nome do álbum" />
    // <SelectGenerico label="Gênero Musical" options={['Rock', 'Pop', 'Jazz']} />
    // <TextAreaGenerico label="Descrição do Álbum" placeholder="Escreva uma descrição para o álbum" />
    // <LabelGenerico text="Data de Lançamento:" htmlFor="dataLancamento" />
  );
}

export default App;
