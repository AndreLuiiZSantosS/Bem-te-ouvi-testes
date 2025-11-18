type tipoOptions = "dia" | "mes" | "ano"

interface DateEventoProps{
    tipoOption:tipoOptions;
}

export default function DateEvento({tipoOption}:DateEventoProps){
    function diaOptions(){
        const diaOptions = [];
        for(let i = 1; i<=31; i++){
            diaOptions.push(<option value={i}>{i}</option>)
        }
        return diaOptions;
    }
    function mesOptions(){
        const meses = [
            [1, "janeiro"], [2, "fevereiro"],[3, "março"], 
            [4, "abril"], [5, "maio"], [6, "junho"],
            [7, "julho"], [8, "agosto"], [9, "setembro"], 
            [10, "outubro"], [11, "novembro"], [12, "dezembro"]
        ];
        return meses.map(([numero, nome]) => (
            <option key={numero} value={numero}>{nome}</option>
        ));
    }

    if(tipoOption==="dia"){
        return(
            <div className="relative inline-block">
                <select name="" id="" aria-placeholder="Dia" className="
                w-[135px] h-[35px] pl-1
                appearance-none outline-none
                border border-[#D43F5D] rounded-[5px]
                text-[#5C1B35] 
                focus:border-[#5C1B35] focus:bg-[#EEEEEE]">
                    {diaOptions()}
                </select>
                <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="
                absolute right-2 top-1/2 -translate-y-1/2
                pointer-events-none 
                fill-[#D43F5D]">
                    <path d="M6.4373e-06 0.628624C-0.000469121 0.54637 0.0152962 0.464831 0.0463991 0.388682C0.077502 0.312534 0.123331 0.243274 0.181257 0.184874C0.239359 0.126294 0.308484 0.0797974 0.384646 0.048067C0.460808 0.0163366 0.542499 0 0.625006 0C0.707514 0 0.789205 0.0163366 0.865367 0.048067C0.941529 0.0797974 1.01065 0.126294 1.06876 0.184874L6.17501 5.29112C6.52657 5.64225 7.00313 5.83947 7.50001 5.83947C7.99688 5.83947 8.47344 5.64225 8.82501 5.29112L13.9313 0.184874C14.0489 0.0671841 14.2086 0.00106663 14.375 0.00106663C14.5414 0.00106663 14.7011 0.0671841 14.8188 0.184874C14.9364 0.302564 15.0026 0.462185 15.0026 0.628624C15.0026 0.795063 14.9364 0.954684 14.8188 1.07237L9.71251 6.17862C9.42222 6.46964 9.07737 6.70054 8.69772 6.85808C8.31806 7.01562 7.91105 7.09671 7.50001 7.09671C7.08896 7.09671 6.68195 7.01562 6.3023 6.85808C5.92264 6.70054 5.57779 6.46964 5.28751 6.17862L0.181257 1.07237C0.123331 1.01397 0.077502 0.944714 0.0463991 0.868565C0.0152962 0.792417 -0.000469121 0.710878 6.4373e-06 0.628624Z"/>
                </svg>



            </div>

        );
    }


    
    
    else if(tipoOption=="mes"){
        return(
            <div className="relative inline-block">
                <select name="" id="" aria-placeholder="Mes" className="
                w-[185px] h-[35px] pl-1
                appearance-none outline-none
                border border-[#D43F5D] rounded-[5px]
                text-[#5C1B35]
                focus:border-[#5C1B35] focus:bg-[#EEEEEE]">
                    {mesOptions()}
                </select>  

                <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="
                absolute right-2 top-1/2 -translate-y-1/2
                pointer-events-none 
                fill-[#D43F5D]">
                    <path d="M6.4373e-06 0.628624C-0.000469121 0.54637 0.0152962 0.464831 0.0463991 0.388682C0.077502 0.312534 0.123331 0.243274 0.181257 0.184874C0.239359 0.126294 0.308484 0.0797974 0.384646 0.048067C0.460808 0.0163366 0.542499 0 0.625006 0C0.707514 0 0.789205 0.0163366 0.865367 0.048067C0.941529 0.0797974 1.01065 0.126294 1.06876 0.184874L6.17501 5.29112C6.52657 5.64225 7.00313 5.83947 7.50001 5.83947C7.99688 5.83947 8.47344 5.64225 8.82501 5.29112L13.9313 0.184874C14.0489 0.0671841 14.2086 0.00106663 14.375 0.00106663C14.5414 0.00106663 14.7011 0.0671841 14.8188 0.184874C14.9364 0.302564 15.0026 0.462185 15.0026 0.628624C15.0026 0.795063 14.9364 0.954684 14.8188 1.07237L9.71251 6.17862C9.42222 6.46964 9.07737 6.70054 8.69772 6.85808C8.31806 7.01562 7.91105 7.09671 7.50001 7.09671C7.08896 7.09671 6.68195 7.01562 6.3023 6.85808C5.92264 6.70054 5.57779 6.46964 5.28751 6.17862L0.181257 1.07237C0.123331 1.01397 0.077502 0.944714 0.0463991 0.868565C0.0152962 0.792417 -0.000469121 0.710878 6.4373e-06 0.628624Z"/>
                </svg>
            </div>
        )
    }else if(tipoOption=="ano"){
        return(
            <div className="relative inline-block">
                <select name="" id="" aria-placeholder="Mes" className="
                w-[135px] h-[35px] pl-1
                appearance-none outline-none
                border border-[#D43F5D] rounded-[5px]
                text-[#5C1B35]
                focus:border-[#5C1B35] focus:bg-[#EEEEEE]">
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                </select>   

                <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="
                absolute right-2 top-1/2 -translate-y-1/2
                pointer-events-none 
                fill-[#D43F5D]">
                    <path d="M6.4373e-06 0.628624C-0.000469121 0.54637 0.0152962 0.464831 0.0463991 0.388682C0.077502 0.312534 0.123331 0.243274 0.181257 0.184874C0.239359 0.126294 0.308484 0.0797974 0.384646 0.048067C0.460808 0.0163366 0.542499 0 0.625006 0C0.707514 0 0.789205 0.0163366 0.865367 0.048067C0.941529 0.0797974 1.01065 0.126294 1.06876 0.184874L6.17501 5.29112C6.52657 5.64225 7.00313 5.83947 7.50001 5.83947C7.99688 5.83947 8.47344 5.64225 8.82501 5.29112L13.9313 0.184874C14.0489 0.0671841 14.2086 0.00106663 14.375 0.00106663C14.5414 0.00106663 14.7011 0.0671841 14.8188 0.184874C14.9364 0.302564 15.0026 0.462185 15.0026 0.628624C15.0026 0.795063 14.9364 0.954684 14.8188 1.07237L9.71251 6.17862C9.42222 6.46964 9.07737 6.70054 8.69772 6.85808C8.31806 7.01562 7.91105 7.09671 7.50001 7.09671C7.08896 7.09671 6.68195 7.01562 6.3023 6.85808C5.92264 6.70054 5.57779 6.46964 5.28751 6.17862L0.181257 1.07237C0.123331 1.01397 0.077502 0.944714 0.0463991 0.868565C0.0152962 0.792417 -0.000469121 0.710878 6.4373e-06 0.628624Z"/>
                </svg>
            </div>
        )  
    }

}