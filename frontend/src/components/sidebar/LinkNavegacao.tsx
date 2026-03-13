import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface LinkNavegacaoProps{
    texto: string;
    svg: JSX.Element;
    urlNavegacao?: string; // opcional
    onClick?: () => void;  // opcional para ações customizadas
}

export default function LinkNavegacao({ texto, svg, urlNavegacao, onClick }: LinkNavegacaoProps){
    const navigate = useNavigate();

    const handleClick = () => {
        if(onClick) {
            onClick(); // executa ação customizada (logout)
        }
        if(urlNavegacao) {
            navigate(urlNavegacao); // navega caso tenha URL
        }
    }

    return(
        <div className="flex flex-row items-center gap-[2px] group">
            <div className="w-[6px] h-[30px] rounded-[20px] 
            bg-transparent 
            group-hover:bg-[#D43F5D]
            transition-all duration-200 cursor-pointer"></div>

            <div className="flex flex-row items-center gap-[8px]
            w-[214px] h-[36px] rounded-[5px] bg-transparent
            group-hover:bg-[#E6E6E6]
            transition-all duration-200 cursor-pointer" 
            onClick={handleClick}>

                <div className="ml-[12px]">
                    {svg}
                </div>
                <span className="text-[#D43F5D] text-[20px]">{texto}</span>
            </div>
        </div>
    );
}
