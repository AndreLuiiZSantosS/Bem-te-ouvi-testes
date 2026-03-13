interface IconePerfilProps{
    icone:string;
}

export default function IconePerfil({icone}:IconePerfilProps){
    return(
        <div       className="
        size-[13.125rem]
        rounded-full
        bg-[#FAFAFA]
        flex
        items-center
        justify-center
        ">
            <img src={icone} alt="" 
            className="
            size-[12.5rem] rounded-full object-cover
            "/>
        </div>
    )   
}