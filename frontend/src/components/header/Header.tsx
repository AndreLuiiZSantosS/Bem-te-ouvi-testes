import { useState, useEffect } from "react";
// import { useRole } from "../../hooks/useRole";
import BarraPesquisa from "./BarraPesquisa";
import PerfilHeader from "./PerfilHeader";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const carregarDados = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setNome("");
      setImagem(null);
      return;
    }

    fetch("http://localhost:8000/api/usuarios/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // --- CORREÇÃO AQUI ---
        // Verificamos diretamente se o objeto existe, ignorando o campo "perfil" que pode vir vazio

        if (data.musico) {
          // É um músico (objeto preenchido)
          setNome(data.musico.nome_artistico);
          setImagem(
            data.musico.foto_perfil
              ? `http://localhost:8000${data.musico.foto_perfil}`
              : null
          );
        } else if (data.ouvinte) {
          // É um ouvinte (objeto preenchido)
          setNome(data.ouvinte.nome_completo);
          setImagem(
            data.ouvinte.foto_perfil
              ? `http://localhost:8000${data.ouvinte.foto_perfil}`
              : null
          );
        }
      })
      .catch((err) => console.error("Erro ao carregar perfil:", err));
  };

  useEffect(() => {
    carregarDados();

    const handleAuthChange = () => {
      setRole(localStorage.getItem("role"));
      carregarDados();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  if (!role) {
    return (
      <div className="ml-60 w-full h-16 pr-6 flex flex-row items-center justify-end">
        <BarraPesquisa />
        <div className="flex flex-row gap-1.5 ml-[24.25%] items-center mr-[15.063rem]">
          <button
            className="text-[#D43F5D] text-[1.0rem]"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
          <button
            className="text-[#D43F5D] text-[1.0rem]"
            onClick={() => navigate("/registrar")}
          >
            Registrar
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ml-60 w-full h-16 pr-6 flex flex-row items-center justify-end">
        <BarraPesquisa />
        <PerfilHeader nome={nome} imagem={imagem} />
      </div>
    );
  }
};

export default Header;