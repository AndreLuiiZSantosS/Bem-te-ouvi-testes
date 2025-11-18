import React from "react";
import Title from './Title'; 
import capa2 from '../assets/imagem1.jpg';
import capa1 from '../assets/imagem2.jpg';
import icon from '../assets/Playlist-icon.svg';

function Playlist() {
 return (
	 <section className="flex flex-col gap-4">

		<Title iconSrc={icon} text="O que você ouviu por último" />

		<div className="flex gap-6">

			<div className="flex flex-col">
				<img src={capa1} alt="Capa 1" width="200" />
				<p className="mt-[2px] leading-[1.2] text-[#d43f5d]">Rock</p>
				<p className="text-[0.95rem]">58 Faixas</p>
			</div>

			<div className="flex flex-col">
				<img src={capa2} alt="Capa 2" width="200" /> 
				<p className="mt-[2px] leading-[1.2] text-[#d43f5d]">Tijolão (Ao vivo)</p>
				<p className="text-[0.95rem]">Jorge & Matheus</p> 
			</div>

		</div>
	</section>
 );
}

export default Playlist;