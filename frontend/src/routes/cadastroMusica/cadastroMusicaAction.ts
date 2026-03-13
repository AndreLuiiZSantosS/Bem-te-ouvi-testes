import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function cadastroMusicaAction({ request, params }: ActionFunctionArgs) {
  const { albumId } = params;
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  
  if (!albumId) {
    return { erro: "Nenhum álbum selecionado. Volte para o passo anterior." };
  }

  if (!userId) {
    return { erro: "Usuário não autenticado. Faça login novamente." };
  }

  const formData = await request.formData();

  // Debug: verificar o que está sendo enviado
  console.log("FormData recebido no action de música:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  // Verificar se arquivo de áudio foi enviado
  const audioFile = formData.get("audio_file");
  if (!audioFile || !(audioFile instanceof File)) {
    return { erro: "Por favor, adicione o arquivo de áudio da música." };
  }

  // Adicionar informações do álbum ao FormData
  formData.append("album", albumId);
  // Adicionar data de criação (hoje)
  const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
  formData.append("data_criacao", today);
  
  console.log("Enviando música para o album:", albumId);

  try {
    const response = await fetch("http://localhost:8000/bemteouvi_api/musicas/", {
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

    // Redirecionar para próxima etapa do cadastro
    return redirect(`/album/${albumId}/confirmação/`);
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return {
      erro: `Erro ao conectar com o servidor: ${mensagem}\n\nVerifique se o backend está rodando em http://localhost:8000`,
    };
  }
}