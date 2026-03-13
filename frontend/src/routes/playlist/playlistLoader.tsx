// playlistLoader.ts
import type { LoaderFunctionArgs } from "react-router-dom";
import type TypePlaylist from "../../types/typePlaylist";
import type TypeMusica from "../../types/typeMusica";

interface PlaylistLoaderData {
  playlist: TypePlaylist;
  musicas: TypeMusica[];
}

export async function playlistLoader({ params }: LoaderFunctionArgs): Promise<PlaylistLoaderData> {
  return();
}