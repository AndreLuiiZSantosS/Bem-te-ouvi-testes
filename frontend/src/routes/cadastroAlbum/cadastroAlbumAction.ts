import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function cadastroAlbumAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = localStorage.getItem("access_token");


  // Debug: verificar o que está sendo enviado
  console.log("FormData recebido no action:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  try {
    const response = await fetch("http://localhost:8000/bemteouvi_api/albuns/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      let erro = "Erro desconhecido";

      try {
        const data = await response.json();
        erro = JSON.stringify(data, null, 2);
      } catch {
        erro = await response.text();
      }

      return { erro };
    }

    const newAlbum = await response.json();
    
    return redirect(`/album/${newAlbum.id}/musica/`);
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return { 
      erro: `Erro ao conectar com o servidor: ${mensagem}\n\nVerifique se o backend está rodando em http://localhost:8000` 
    };
  }
}
