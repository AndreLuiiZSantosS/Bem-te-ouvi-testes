import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGenerico from "../components/genericos/InputGenerico";
import Button from "../components/Button";
import { jwtDecode } from "jwt-decode";


export default function Login({ toggle }: { toggle: () => void }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      username: email, 
      password: senha
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
''
      if (response.ok) {
        console.log("Login realizado com sucesso!");
        
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        const decoded: any = jwtDecode(data.access);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("user_id", String(decoded.user_id));
        
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChange"));

        navigate("/");
      } else {
        console.error("Erro no login:", data);
        setError("Email ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-[32px] text-[#D43F5D] text-center mb-8 font-normal">
        Entrar
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-500 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">email:</label>
          <InputGenerico
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                setError(null); // Limpa erro ao digitar
            }}
            className={`py-3 text-lg ${error ? "border-red-500" : ""}`}
          />
        </div>

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">senha:</label>
          <InputGenerico
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => {
                setSenha(e.target.value);
                setError(null); // Limpa erro ao digitar
            }}
            className={`py-3 text-lg ${error ? "border-red-500" : ""}`}
          />
        </div>

        <div className="flex justify-between items-center text-sm text-[#D43F5D] mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={lembrarSenha}
              onChange={(e) => setLembrarSenha(e.target.checked)}
              className="accent-[#D43F5D] w-4 h-4"
            />
            <span>Lembrar senha</span>
          </label>

          <a href="#" className="hover:underline">
            Esqueceu a senha? <span className="font-bold underline">Clique aqui</span>
          </a>
        </div>

        <div className="mt-4 flex justify-center w-full [&>button]:w-full [&>button]:justify-center [&>button]:text-lg [&>button]:py-3">
          <Button 
            text={loading ? "Entrando..." : "Entrar"} 
            type="submit" 
            variant="proximo" 
            disabled={loading} // Desabilita botão durante o load
          />
        </div>

        <p className="text-center text-xs text-[#D43F5D] mt-2">
          Não tem uma conta ainda?{" "}
          <span 
            onClick={toggle}
            className="font-bold underline cursor-pointer hover:text-[#b0324b]"
          >
            Registre-se aqui
          </span>
        </p>
      </form>
    </>
  );
}