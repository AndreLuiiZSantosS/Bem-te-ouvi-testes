import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

interface LinkNavegacaoProps{
    texto:string;
    svg: JSX.Element;
    urlNavegacao:string;
}

export default function LinkNavegacao({texto, svg, urlNavegacao}:LinkNavegacaoProps){
    const navigate = useNavigate();
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
            onClick={()=> navigate(urlNavegacao)}>

                <div className="ml-[12px]">
                    {svg}
                </div>
                <span className="text-[#D43F5D] text-[20px]">{texto}</span>
            </div>
        </div>
    );
}