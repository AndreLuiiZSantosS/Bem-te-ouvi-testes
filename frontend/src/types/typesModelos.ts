interface TypeMusico {
  id: number;
  nome_artistico: string;
  biografia?: string;
  foto_perfil?: string;
  redes_sociais?: string;
}

interface TypeAlbumResumo {
  id: number;
  titulo: string;
  imagem_capa?: string;
  musicos: TypeMusico[];
}

export default interface TypeMusica {
  id: number;
  titulo: string;
  audio_file: string;
  album_info: TypeAlbumResumo;
  duracao_formatada: string;
}

export interface TypeEvento {
  id: number;
  nome: string;
  endereco: string;
  imagem_do_evento: string;
  data_do_evento: string;
  descricao?: string;
  musico: {
    id: number;
    nome_artistico: string;
    foto_perfil?: string;
  };
}