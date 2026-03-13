import AcoesItemPlaylist from "./AcoesItemPlaylist";
import AlbumItemPlaylist from "./AlbumItemPlaylist";
import CantorItemPlaylist from "./CantorItemPlaylist";
import DataAdicaoItemPlaylist from "./DataAdicaoItemPlaylist";
import DuracaoItemPlaylist from "./DuracaoItemPlaylist";
import ImagemItemPlaylist from "./ImagemItemPlaylist";
import NomeItemPlaylist from "./NomeItemPlaylist";

export default function ItemPlaylist(){
    //TODO
    // Puxar os dados reais das músicas para popular os campos abaixo
    // Integrar com o backend para buscar dados reais das músicas

    // Adicionar funcionalidade de clique para tocar a música
    // Adicionar funcionalidade de clique nos botões de ação
    // Adicionar if para destacar a música que está tocando atualmente
    return(
        <div 
        className="w-[68.75rem] h-[4.063rem]
        bg-[#FFFFFF] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
        pl-[0.313rem]
        flex flex-row items-center">
            <div className="flex flex-row items-center gap-[0.688rem]">
                <ImagemItemPlaylist capa={capaMusica}/>
                <NomeItemPlaylist nome={nomeMusica}/>
            </div>

            <div className="ml-[14%]">
                <AcoesItemPlaylist/>
            </div>

            <div className="ml-[1.125rem]">
                <CantorItemPlaylist nome={nomeMusico}/>
            </div>

            <div className="ml-[16.5rem]">
                <AlbumItemPlaylist nome={nomeAlbum}/>
            </div>

            <div className="ml-[8.625rem]">
                <DuracaoItemPlaylist duracao={duracaoMusica}/>
            </div>
            
            <div className="ml-[5.75rem]">
                <DataAdicaoItemPlaylist data={dataAdicao}/>
            </div>
        </div>
    )
}