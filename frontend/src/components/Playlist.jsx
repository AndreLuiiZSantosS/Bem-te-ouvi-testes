import React from "react";
import capa2 from '../assets/imagem1.jpg';
import capa1 from '../assets/imagem2.jpg';
import icon from '../assets/Playlist-icon.svg';

function Playlist() {
  return (
    <section className="caixa">

        <div className="caixa-titulo">
            <img src={icon} alt="Ícone" width="40" />
            <h2>O que você ouviu por último</h2>
        </div>

        <div className="caixa-ListaDeMusicas">

          <div className="musica">
            <img src={capa1} alt="Capa 1" width="200" />
            <p>Rock</p>
            <p>58 Faixas</p>
          </div>

          <div className="musica">
            <img src={capa2} alt="Capa 2" width="200" />    
            <p>Tijolão (Ao vivo)</p>
            <p>Jorge & Matheus</p> 
          </div>

        </div>
    </section>
  );
}

export default Playlist;