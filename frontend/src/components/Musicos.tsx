import React from 'react';
import SectionTitle from './Title'; 
import icon from '../assets/Playlist-icon.svg'; 
import capa3 from '../assets/Rectangle.jpg'; 
function Musicos() {
  return (
    <section>

      <SectionTitle iconSrc={icon} text="Músicos que você pode gostar" />

        <div className="flex gap-6">

          <div className='flex flex-col'>
            <img src={capa3} alt="Capa 3" width="200" />
            <p className="mt-[2px] leading-[1.2] text-[#d43f5d]">Músico.nome</p>
            <p className="text-[0.95rem]">426 fãs</p>
          </div>

          <div className='flex flex-col'>
            <img src={capa3} alt="Capa 3" width="200" />
            <p className="mt-[2px] leading-[1.2] text-[#d43f5d]">Músico.nome</p>
            <p className="text-[0.95rem]">10000 fãs</p>
          </div>

          <div className='flex flex-col'>
            <img src={capa3} alt="Capa 3" width="200" />
            <p className="mt-[2px] leading-[1.2] text-[#d43f5d]">Músico.nome</p>
            <p className="text-[0.95rem]">893 fãs</p>
          </div>
      </div>
    </section>
  );
}

export default Musicos;