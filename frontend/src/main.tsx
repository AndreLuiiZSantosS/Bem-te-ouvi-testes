import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import BemteouviRoot from './routes/BemteouviRoot.tsx'
import CadastroAlbum from './routes/CadastroAlbum.tsx'
import CadastroMusica from './routes/CadastroMusica.tsx'
import ConfirmarAlbum from './routes/ConfirmarAlbum.tsx'

import AnunciarEvento from './routes/AnunciarEvento.tsx'
import PaginaInicial from './routes/PaginaInicial.tsx'
import { PlayerProvider } from './contexts/PlayerContext'


import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <BemteouviRoot/>,
    children: [
      {
        path: "/paginaInicial",
        element: <PaginaInicial/>,
      },
      {
        path: "/criarAlbum/1",
        element: <CadastroAlbum/>,
      },
      {
        path: "/criarAlbum/2/:albumId",
        element: <CadastroMusica/>,
      },
      {
        path: "/criarAlbum/3",
        element: <ConfirmarAlbum/>,
      },
      {
        path: "/anunciarEvento",
        element: <AnunciarEvento/>,
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  </StrictMode>,
)
