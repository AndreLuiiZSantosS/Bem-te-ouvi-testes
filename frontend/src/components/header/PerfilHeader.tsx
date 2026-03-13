interface PerfilHeaderProps{
    nome:string;
    imagem:string|null;
}

export default function PerfilHeader({nome, imagem}:PerfilHeaderProps){
        return(
            <div className="flex flex-row gap-1.5 ml-[24.25%] items-center mr-[15.063rem]">
                <span className="text-[#D43F5D] text-[1.0rem]">{nome}</span>
                <img src={imagem ?? "/imgNull.png"} alt="foto de perfil usuário autenticado" className="
                size-[1.875rem]
                rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"/>
            </div>
        );

}