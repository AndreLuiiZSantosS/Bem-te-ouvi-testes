import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function confirmarAlbumAction({ request, params }: ActionFunctionArgs) {
  const { albumId } = params;
  const token = localStorage.getItem("access_token");

  if (!albumId) {
    return { erro: "Nenhum álbum selecionado" };
  }

  const formData = await request.formData();
  const action = formData.get("_action");

  // Debug
  console.log("FormData recebido no confirmarAlbumAction:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  try {
    if (action === "update-album") {
      // Atualizar álbum (PATCH)
      const updateData = new FormData();

      const titulo = formData.get("titulo");
      const genero = formData.get("genero");
      const capa = formData.get("imagem_capa");

      if (titulo && titulo.toString().trim()) {
        updateData.append("titulo", titulo.toString());
      }
      if (genero && genero.toString().trim()) {
        updateData.append("genero", genero.toString());
      }
      if (capa instanceof File) {
        updateData.append("imagem_capa", capa);
      }

      const response = await fetch(
        `http://localhost:8000/bemteouvi_api/albuns/${albumId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updateData,
        }
      );

      if (!response.ok) {
        let erro = "Erro ao atualizar álbum";
        try {
          const data = await response.json();
          erro = JSON.stringify(data, null, 2);
        } catch {
          erro = await response.text();
        }
        return { erro };
      }

      return { sucesso: "Álbum atualizado com sucesso!" };
    } else if (action === "delete-musica") {
      // Deletar música
      const musicaId = formData.get("musica_id");

      const response = await fetch(
        `http://localhost:8000/bemteouvi_api/musicas/${musicaId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return { erro: "Erro ao deletar música" };
      }

      return { sucesso: "Música deletada com sucesso!" };
    } else if (action === "create-album") {
      // Finalizar criação do álbum (se necessário fazer algo final)
      return redirect("/");
    }

    return { erro: "Ação não reconhecida" };
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return {
      erro: `Erro ao processar: ${mensagem}\n\nVerifique se o backend está rodando em http://localhost:8000`,
    };
  }
}
