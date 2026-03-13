interface LabelGenericoProps{
    labelGenerico:string;
    id?:string;
    disabledLabel?:boolean;
}

export default function LabelGenerico({labelGenerico, id, disabledLabel = false}:LabelGenericoProps){
    return(
        <label className={`text-[16px]
        ${disabledLabel ? "text-[#888888]" : "text-[#D43F5D]"}
        `}
        htmlFor={id} aria-disabled={disabledLabel}>{labelGenerico}:</label>
    )
}