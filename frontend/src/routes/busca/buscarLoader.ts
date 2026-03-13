import type { LoaderFunctionArgs } from "react-router-dom";

interface Musica {
  id: number;
  titulo: string;
  genero: string;
  audio_file?: string;
  album_info?: {
    id: number;
    titulo: string;
    imagem_capa?: string;
  };
}

interface Musico {
  id: number;
  nome_artistico: string;
  foto_perfil?: string;
}

export async function buscarLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  try {
    // Se houver termo de busca, buscar músicas e músicos filtrados
    if (query.trim()) {
      const [musicasResponse, musicosResponse] = await Promise.all([
        fetch(`http://localhost:8000/bemteouvi_api/musicas/?search=${encodeURIComponent(query)}`),
        fetch(`http://localhost:8000/bemteouvi_api/musicos/?search=${encodeURIComponent(query)}`)
      ]);

      if (!musicasResponse.ok || !musicosResponse.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const musicas: Musica[] = await musicasResponse.json();
      const musicos: Musico[] = await musicosResponse.json();

      // Enriquecer dados com informações de capas do álbum
      const musicasComCapa = musicas.map((musica) => ({
        ...musica,
        imagem_capa: musica.album_info?.imagem_capa || undefined,
        audio: musica.audio_file,
      }));

      return {
        musicas: musicasComCapa,
        musicos,
        query,
      };
    }

    // Se não houver termo, retornar arrays vazios (não mostrar tudo)
    return {
      musicas: [],
      musicos: [],
      query: "",
    };
  } catch (error) {
    const mensagem =
      error instanceof Error ? error.message : "Erro desconhecido";
    return {
      musicas: [],
      musicos: [],
      query,
      erro: `Erro ao carregar dados: ${mensagem}`,
    };
  }
}
