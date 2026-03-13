import Musica from "../../components/index/Musica";
import Evento from "../../components/index/Evento";
import Playlist from "../../components/index/Playlist";
import CardPerfil from "../../components/perfil/CardPerfil";
import ItemPlaylist from "../../components/playlist/itemPlaylist/ItemPlaylist";
import type TypeMusica from "../../types/typesModelos";
import type { TypeEvento } from "../../types/typesModelos";
import { useState, useEffect } from "react";

export default function PaginaInicial() {
  const [musicas, setMusicas] = useState<TypeMusica[]>([]);
  const [eventos, setEventos] = useState<TypeEvento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Busca de músicas
    fetch("http://localhost:8000/bemteouvi_api/musicas/") // busca pública
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar músicas");
        return res.json();
      })
      .then(async (data) => {
        // cria array de Promises para carregar duração de cada música
        const musicasComDuracao = await Promise.all(
          data.map(
            (m: any) =>
              new Promise<TypeMusica>((resolve) => {
                const audio = new Audio(m.audio_file);
                audio.addEventListener("loadedmetadata", () => {
                  const duracaoSegundos = audio.duration;
                  const minutes = Math.floor(duracaoSegundos / 60);
                  const seconds = Math.floor(duracaoSegundos % 60);
                  resolve({
                    id: m.id,
                    titulo: m.titulo,
                    audio_file: m.audio_file,
                    duracao_formatada: `${minutes.toString().padStart(2, "0")}:${seconds
                      .toString()
                      .padStart(2, "0")}`,
                    album_info: {
                      id: m.album_info.id,
                      titulo: m.album_info.titulo,
                      imagem_capa: m.album_info.imagem_capa,
                      musicos: m.album_info.musicos,
                    },
                  });
                });
                // fallback caso não carregue
                audio.addEventListener("error", () => {
                  resolve({
                    id: m.id,
                    titulo: m.titulo,
                    audio_file: m.audio_file,
                    duracao_formatada: "00:00",
                    album_info: {
                      id: m.album_info.id,
                      titulo: m.album_info.titulo,
                      imagem_capa: m.album_info.imagem_capa,
                      musicos: m.album_info.musicos,
                    },
                  });
                });
              })
          )
        );

        setMusicas(musicasComDuracao);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Busca de eventos
    fetch("http://localhost:8000/bemteouvi_api/eventos/")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar eventos");
        return res.json();
      })
      .then((data) => {
        setEventos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Dentro da função PaginaInicial
  const registrarPlay = async (musicaId: number) => {
    const token = localStorage.getItem("access_token"); // Ou onde você guarda seu JWT

    try {
      const response = await fetch(`http://localhost:8000/bemteouvi_api/musicas/${musicaId}/play/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log("Observer ativado: Estatística registrada!");
      }
    } catch (error) {
      console.error("Erro ao comunicar com o Observer:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-[5px] mb-[25px]">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.6667 13.3333V26.6667C31.6667 27.5883 30.9217 28.3333 30 28.3333C29.0783 28.3333 28.3333 27.5883 28.3333 26.6667V13.3333C28.3333 12.4117 29.0783 11.6667 30 11.6667C30.9217 11.6667 31.6667 12.4117 31.6667 13.3333ZM23.3333 0C22.4117 0 21.6667 0.745 21.6667 1.66667V38.3333C21.6667 39.255 22.4117 40 23.3333 40C24.255 40 25 39.255 25 38.3333V1.66667C25 0.745 24.255 0 23.3333 0ZM36.6667 6.66667C35.745 6.66667 35 7.41167 35 8.33333V31.6667C35 32.5883 35.745 33.3333 36.6667 33.3333C37.5883 33.3333 38.3333 32.5883 38.3333 31.6667V8.33333C38.3333 7.41167 37.5883 6.66667 36.6667 6.66667ZM16.6667 6.66667C15.745 6.66667 15 7.41167 15 8.33333V31.6667C15 32.5883 15.745 33.3333 16.6667 33.3333C17.5883 33.3333 18.3333 32.5883 18.3333 31.6667V8.33333C18.3333 7.41167 17.5883 6.66667 16.6667 6.66667ZM9.99999 11.6667C9.07832 11.6667 8.33332 12.4117 8.33332 13.3333V26.6667C8.33332 27.5883 9.07832 28.3333 9.99999 28.3333C10.9217 28.3333 11.6667 27.5883 11.6667 26.6667V13.3333C11.6667 12.4117 10.9217 11.6667 9.99999 11.6667ZM3.33332 15C2.41166 15 1.66666 15.745 1.66666 16.6667V23.3333C1.66666 24.255 2.41166 25 3.33332 25C4.25499 25 4.99999 24.255 4.99999 23.3333V16.6667C4.99999 15.745 4.25499 15 3.33332 15Z"
            fill="#D43F5D"
          />
        </svg>
        <h1 className="text-[36px] text-[#D43F5D]">
          Todas as músicas
        </h1>
      </div>

      <div className="flex flex-row gap-[25px] items-center overflow-x-auto h-[200px]">
        {musicas.map((m) => (
          <Musica
            key={m.id}
            musica={m}
            onPlay={() => registrarPlay(m.id)} // Passando a ação
          />
        ))}
      </div>

      <div className="flex flex-row items-center gap-[5px] mb-[25px] mt-[50px]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3333 20H10C8.16167 20 6.66667 21.495 6.66667 23.3333V26.6667C6.66667 28.505 8.16167 30 10 30H13.3333C15.1717 30 16.6667 28.505 16.6667 26.6667V23.3333C16.6667 21.495 15.1717 20 13.3333 20ZM10 26.6667V23.3333H13.3333V26.6667H10ZM31.6667 3.33333H30V1.66667C30 0.746667 29.255 0 28.3333 0C27.4117 0 26.6667 0.746667 26.6667 1.66667V3.33333H13.3333V1.66667C13.3333 0.746667 12.5883 0 11.6667 0C10.745 0 10 0.746667 10 1.66667V3.33333H8.33333C3.73833 3.33333 0 7.07167 0 11.6667V31.6667C0 36.2617 3.73833 40 8.33333 40H31.6667C36.2617 40 40 36.2617 40 31.6667V11.6667C40 7.07167 36.2617 3.33333 31.6667 3.33333ZM8.33333 6.66667H31.6667C34.4233 6.66667 36.6667 8.91 36.6667 11.6667V13.3333H3.33333V11.6667C3.33333 8.91 5.57667 6.66667 8.33333 6.66667ZM31.6667 36.6667H8.33333C5.57667 36.6667 3.33333 34.4233 3.33333 31.6667V16.6667H36.6667V31.6667C36.6667 34.4233 34.4233 36.6667 31.6667 36.6667Z" fill="#D43F5D" />
        </svg>


        <h1 className="text-[36px] text-[#D43F5D]">
          Próximos eventos
        </h1>
      </div>

      <div className="flex flex-row gap-[25px] items-center overflow-x-auto h-[220px]">
        {eventos.map((e) => (
          <Evento key={e.id} evento={e} />
        ))}
      </div>

      {/* teste: */}
      {/* <ItemPlaylist />
      <CardPerfil
        nome="Rythm"
        qtdFans={2}
        qtdSeguidores={1240}
        descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec bibendum diam, nec efficitur ante. Nulla congue sodales sollicitudin. Sed finibus tortor aliquet sem aliquet aliquam a non eros. Vivamus venenatis, metus sit amet gravida elementum, nisl diam vestibulum elit, eget pretium justo dui at velit. Suspendisse tellus ex, luctus vitae tincidunt eu, tincidunt vitae arcu. "
      /> */}
    </div>
  );
}
