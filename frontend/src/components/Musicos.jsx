import react from 'react';
import icon from '../assets/Playlist-icon.svg';
import capa3 from '../assets/Rectangle.jpg';

function Musicos() {
  return (
    <section>
      <div className="caixa-titulo">
        <img src={icon} alt="Ícone" width="40" />
        <h2>Músicos que você pode gostar</h2>
      </div>

      <div className="caixa-ListaDeMusicas">

        <div className='musica'>
          <img src={capa3} alt="Capa 3" width="200" />
          <p>Músico.nome</p>
          <p>426 fãs</p>
        </div>

        
        <div className='musica'>
          <img src={capa3} alt="Capa 3" width="200" />
          <p>Músico.nome</p>
          <p>10000 fãs</p>
        </div>

        
        <div className='musica'>
          <img src={capa3} alt="Capa 3" width="200" />
          <p>Músico.nome</p>
          <p>893 fãs</p>
        </div>
      
      </div>
    </section>
  );
}

export default Musicos;