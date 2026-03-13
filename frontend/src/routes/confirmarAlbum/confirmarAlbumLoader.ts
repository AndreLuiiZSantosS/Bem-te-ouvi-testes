import type { LoaderFunctionArgs } from "react-router-dom";

export async function confirmarAlbumLoader({ params }: LoaderFunctionArgs) {
  const { albumId } = params;
  const token = localStorage.getItem("access_token");

  if (!albumId) {
    throw new Error("Nenhum álbum selecionado");
  }

  try {
    // 1. BUSCAR O ÁLBUM
    const albumResponse = await fetch(
      `http://localhost:8000/bemteouvi_api/albuns/${albumId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!albumResponse.ok) {
      throw new Error("Falha ao buscar dados do álbum");
    }

    const albumData = await albumResponse.json();

    // 2. BUSCAR AS MÚSICAS (Com a barra no final)
    const musicasResponse = await fetch(
      `http://localhost:8000/bemteouvi_api/albuns/${albumId}/musicas/`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    let musicasData = [];
    if (musicasResponse.ok) {
      const data = await musicasResponse.json();
      // O endpoint customizado @action retorna a lista direta, mas prevenimos se for paginado
      musicasData = Array.isArray(data) ? data : (data.results || []);
      
      // OBS: Removi o .filter() manual. O backend já garante que só vêm músicas desse álbum.
      // Fazer filtragem manual aqui pode causar erro se os tipos de ID (string vs int) não baterem.
    }

    // 3. BUSCAR OS MÚSICOS (Descomentado e corrigido)
    // O objeto 'albumData' NÃO traz os músicos automaticamente, temos que buscar no endpoint.
    const musicosResponse = await fetch(
      `http://localhost:8000/bemteouvi_api/albuns/${albumId}/musicos/`, // <--- Barra no final é essencial
      {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
      }
    );

    let musicosData = [];
    if (musicosResponse.ok) {
        const data = await musicosResponse.json();
        musicosData = Array.isArray(data) ? data : [];
    }

    return {
      album: albumData,
      musicas: musicasData,
      musicos: musicosData,
    };
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro desconhecido";
    throw new Error(
      `Erro ao carregar dados do álbum: ${mensagem}\n\nVerifique se o backend está rodando em http://localhost:8000`
    );
  }
}