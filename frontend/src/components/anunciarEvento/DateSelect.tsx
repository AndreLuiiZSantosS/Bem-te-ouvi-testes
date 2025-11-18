// import DateAno from "./DateAno";
import DateEvento from "./DateEvento";
// import DateMes from "./DateMes";

export default function DateSelect(){
    return(
        <div className="flex flex-row gap-[22px]">
            <DateEvento tipoOption="dia"/>
            <DateEvento tipoOption="mes"/>
            <DateEvento tipoOption="ano"/>
        </div>
    );
}