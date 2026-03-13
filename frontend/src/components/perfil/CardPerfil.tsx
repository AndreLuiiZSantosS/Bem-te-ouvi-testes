import IconePerfil from "./IconePerfil";
import perfil from "/imagemAlbum.png";
import capa from "/windows7bg.png"

interface CardPerfilProps{
    nome:string;
    qtdFans:number;
    qtdSeguidores:number;
    descricao:string;
}

export default function CardPerfil({nome, qtdFans, qtdSeguidores, descricao}:CardPerfilProps) {
    // TODO: Adicionar os svg dos 3 pontos
    // TODO: Adicionar botão de seguir 
    return (
        <div className="w-[68.75rem] h-[26.25rem] 
        rounded-[1.25rem] bg-[#FFFFFF] 
        flex flex-col relative 
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <img 
                src={capa} 
                alt="Capa" 
                className="w-full h-[15.313rem] rounded-t-[1.25rem]" 
            />

            {/* 3. O PERFIL (Sobreposto) */}
            {/* absolute: solta ele do fluxo */}
            {/* left-5: distancia da esquerda */}
            {/* top-32: ajusta a altura para ficar meio dentro/meio fora da capa (ajuste esse valor conforme a altura da sua capa) */}
            <div className="absolute left-5 top-24"> 
                <IconePerfil icone={perfil} />
            </div>

            <span className="
            text-[#D43F5D] text-[32px] 
            absolute left-[14.375rem] top-[15.563rem]"><b>{nome}</b></span>

            <div className="flex flex-row gap-5 absolute left-[14.375rem] top-[17.938rem]">
                <span className="text-[15px] text-[#D43F5D]"><b>{qtdFans}</b> fans</span>
                <span className="text-[15px] text-[#D43F5D]"><b>{qtdSeguidores}</b> seguindo</span>
            </div>

            <span className="text-[15px] text-[#D43F5D] w-[44.875rem] absolute left-5 top-[19.688rem]" >{descricao}</span>
        </div>
    );
}



// <CardPerfil nome="Rythm" qtdFans={2} qtdSeguidores={1240} descricao="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec bibendum diam, nec efficitur ante. Nulla congue sodales sollicitudin. Sed finibus tortor aliquet sem aliquet aliquam a non eros. Vivamus venenatis, metus sit amet gravida elementum, nisl diam vestibulum elit, eget pretium justo dui at velit. Suspendisse tellus ex, luctus vitae tincidunt eu, tincidunt vitae arcu. "/>
