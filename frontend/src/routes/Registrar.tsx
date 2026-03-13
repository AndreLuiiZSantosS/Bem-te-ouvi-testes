import type { FormEvent, ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGenerico from "../components/genericos/InputGenerico";
import Button from "../components/Button";

interface ApiErrors {
  [key: string]: string[];
}

export default function Registrar({ toggle }: { toggle: () => void }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<ApiErrors>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    tipoPessoa: "", 
    nome_generico: "", 
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (apiErrors[id]) {
        setApiErrors(prev => ({ ...prev, [id]: [] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiErrors({});

    const payload: any = {
      username: formData.email, 
      email: formData.email,
      password: formData.password,
      password_confirm: formData.password_confirm,
      perfil: formData.tipoPessoa,
    };

    if (formData.tipoPessoa === "musico") {
      payload.nome_artistico = formData.nome_generico;
      payload.biografia = ""; 
      payload.redes_sociais = "";
    } else {
      payload.nome_completo = formData.nome_generico;
    }

    try {
      const response = await fetch("http://localhost:8000/api/registro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("refresh_token", data.tokens.refresh);

        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("authChange"));
        
        navigate("/"); 
      } else {
        console.error("Erro no registro:", data);
        setApiErrors(data);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h2 className="text-[32px] text-[#D43F5D] text-center mb-8 font-normal">
        Registrar-se
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">nome:</label>
          <InputGenerico
            id="nome_generico"
            type="text"
            value={formData.nome_generico}
            onChange={handleChange}
            className="py-3 text-lg"
          />

          {(apiErrors.nome_artistico || apiErrors.nome_completo) && (
             <span className="text-red-500 text-sm ml-1">
               {apiErrors.nome_artistico?.[0] || apiErrors.nome_completo?.[0]}
             </span>
          )}
        </div>

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">email:</label>
          <InputGenerico
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`py-3 text-lg ${apiErrors.email ? "border-red-500" : ""}`}
          />

          {apiErrors.email &&
            <span className="text-red-500 text-sm ml-1">
              {apiErrors.email[0]}
            </span>
          }
        </div>

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">senha:</label>
          <InputGenerico
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`py-3 text-lg ${apiErrors.password ? "border-red-500" : ""}`}
          />
          
          {apiErrors.password && 
            <span className="text-red-500 text-sm ml-1">
              {apiErrors.password[0]}
            </span>
          }
        </div>

        <div>
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">confirmar senha:</label>
          <InputGenerico
            id="password_confirm"
            type="password"
            value={formData.password_confirm}
            onChange={handleChange}
            className="py-3 text-lg"
          />
        </div>


        <div className="relative">
          <label className="block text-[#D43F5D] text-lg mb-1 ml-1">tipo de pessoa:</label>
          <select
            id="tipoPessoa"
            value={formData.tipoPessoa}
            onChange={handleChange}
            className="
              w-full px-4 pr-10 py-3 bg-white border border-[#D43F5D]
              rounded-lg text-gray-700 focus:outline-none
              focus:ring-2 focus:ring-[#D43F5D] text-lg cursor-pointer
              appearance-none
            "
            required
          >
            <option value="" disabled hidden></option>
            <option value="ouvinte">Ouvinte</option>
            <option value="musico">Músico</option>
          </select>
          {apiErrors.perfil && <span className="text-red-500 text-sm ml-1">{apiErrors.perfil[0]}</span>}

          <svg
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-4 top-[69.80%] -translate-y-1/2 pointer-events-none"
          >
            <path
              d="M0.000128746 0.628624C-0.000347137 0.54637 0.0154181 0.464831 0.0465212 0.388682C0.0776243 0.312534 0.123453 0.243274 0.181379 0.184874C0.239481 0.126294 0.308606 0.0797974 0.384768 0.048067C0.46093 0.0163366 0.542621 0 0.625129 0C0.707636 0 0.789327 0.0163366 0.865489 0.048067C0.941651 0.0797974 1.01078 0.126294 1.06888 0.184874L6.17513 5.29112C6.52669 5.64225 7.00325 5.83947 7.50013 5.83947C7.997 5.83947 8.47357 5.64225 8.82513 5.29112L13.9314 0.184874C14.0491 0.0671841 14.2087 0.00106663 14.3751 0.00106663C14.5416 0.00106663 14.7012 0.0671841 14.8189 0.184874C14.9366 0.302564 15.0027 0.462185 15.0027 0.628624C15.0027 0.795062 14.9366 0.954684 14.8189 1.07237L9.71263 6.17862C9.42234 6.46964 9.0775 6.70054 8.69784 6.85808C8.31818 7.01562 7.91117 7.09671 7.50013 7.09671C7.08908 7.09671 6.68208 7.01562 6.30242 6.85808C5.92276 6.70054 5.57791 6.46964 5.28763 6.17862L0.181379 1.07237C0.123453 1.01397 0.0776243 0.944714 0.0465212 0.868565C0.0154181 0.792417 -0.000347137 0.710878 0.000128746 0.628624Z"
              fill="#D43F5D"
            />
          </svg>
        </div>
        <Button 
            text={loading ? "Carregando..." : "Registrar-se"} 
            variant="proximo" 
            type="submit" 
            disabled={loading}/>

        <p className="text-center text-xs text-[#D43F5D] mt-2">
          Já possui uma conta?{" "}
          <span 
            onClick={toggle}
            className="font-bold underline cursor-pointer hover:text-[#b0324b]"
          >
            Entre por aqui
          </span>
        </p>
      </form>
    </>
  );
}