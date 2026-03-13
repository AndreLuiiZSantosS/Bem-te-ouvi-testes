import { createBrowserRouter } from "react-router";
import BemteouviRoot from "./routes/BemteouviRoot";
import AnunciarEvento from "./routes/anunciarEvento/AnunciarEvento";
import PaginaInicial from "./routes/paginaInicial/PaginaInicial";
import CadastroAlbum from "./routes/cadastroAlbum/CadastroAlbum";
import CadastroMusica from "./routes/cadastroMusica/CadastroMusica";
import ConfirmarAlbum from "./routes/confirmarAlbum/ConfirmarAlbum";
import { anunciarEventoAction } from "./routes/anunciarEvento/anunciarEventoActions";
import { cadastroAlbumAction } from "./routes/cadastroAlbum/cadastroAlbumAction";
import { cadastroMusicaAction } from "./routes/cadastroMusica/cadastroMusicaAction";
import { confirmarAlbumLoader } from "./routes/confirmarAlbum/confirmarAlbumLoader";
import { confirmarAlbumAction } from "./routes/confirmarAlbum/confirmarAlbumAction";
import Buscar from "./routes/busca/Buscar";
import { buscarLoader } from "./routes/busca/buscarLoader";
import Playlist from "./routes/playlist/Playlist";
import Auth from "./components/Auth";

export const router = createBrowserRouter([
    {
    path: "/login",
    Component: Auth,
  },
  {
    path: "/registrar",
    Component: Auth,
  },
  {
    path: "/",
    Component: BemteouviRoot,
    children: [
      {index: true, Component: PaginaInicial},
      {
        path: "album",
        Component: CadastroAlbum,
        action: cadastroAlbumAction,
      },
      {
        path: "album/:albumId/musica/",
        Component: CadastroMusica,
        action: cadastroMusicaAction,
      },
      {
        path: "album/:albumId/confirmação/",
        Component: ConfirmarAlbum,
        loader: confirmarAlbumLoader,
        action: confirmarAlbumAction,
      },
      {
        path: "evento", 
        Component: AnunciarEvento, 
        action: anunciarEventoAction,
      },
      {
        path: "busca", 
        Component: Buscar,
        loader: buscarLoader,
      },
      {
        path: "playlist", 
        Component: Playlist,
      },
    ]
  }
]);