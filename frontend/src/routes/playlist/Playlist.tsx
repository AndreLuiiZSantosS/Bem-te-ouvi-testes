import BotaoOuvirPlaylist from "../../components/playlist/BotaoOuvirPlaylist";
import CriadorPlaylist from "../../components/playlist/dadosPlaylist/CriadorPlaylist";
import ImagemPlaylist from "../../components/playlist/dadosPlaylist/ImagemPlaylist";
import InformacaoPlaylist from "../../components/playlist/dadosPlaylist/InformacaoPlaylist";
import TituloPlaylist from "../../components/playlist/dadosPlaylist/TituloPlaylist";
import BotaoEditarPlaylist from "../../components/playlist/editarPlaylist/BotaoEditarPlaylist";
import ItemPlaylist from "../../components/playlist/itemPlaylist/ItemPlaylist";

export default function Playlist(){
    // useLoaderData() as { playlist:Playlist}
    return(
        <div>
            <div className="flex flex-row gap-[1.688rem]">
                <ImagemPlaylist capa={playlist.imagem}/>
                <div className="flex flex-col gap-1">
                    <TituloPlaylist titulo={playlist.titulo}/>
                    <CriadorPlaylist perfilCriador={playlist.perfilCriador} nomeCriador={playlist.nomeCriador}/>
                    <InformacaoPlaylist privada={playlist.privacidade} quantidadeMusicas={playlist.qtdMusicas} tempoTotal={playlist.duracao}/>
                </div>
            </div>
            
            <div 
            className="flex flex-row gap-5
            mt-[1.563rem]">
                <BotaoOuvirPlaylist play={true}/>
                <BotaoEditarPlaylist/>
            </div>

            <div className="mt-[3.125rem] flex flex-col gap-2.5">
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
            </div>
        </div>
    );
}