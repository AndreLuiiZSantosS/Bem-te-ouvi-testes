import type { ActionFunctionArgs } from "react-router-dom";
import { redirect } from "react-router-dom";

export async function anunciarEventoAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = localStorage.getItem("access_token");

  // Debug: verificar os dados que estão sendo enviados
//   console.log("FormData recebido:");
//   for (const [key, value] of formData.entries()) {
//     if (value instanceof File) {
//       console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
//     } else {
//       console.log(`${key}: ${value}`);
//     }
//   }

  // Para agora. Depois integrar com autenticação
  formData.append("musico", "1");

  try {
    const response = await fetch("http://localhost:8000/bemteouvi_api/eventos/", {
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

    return redirect("/");
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
    return { 
      erro: `Erro ao conectar com o servidor: ${mensagem}\n\nVerifique se o backend está rodando em http://localhost:8000` 
    };
  }
}
