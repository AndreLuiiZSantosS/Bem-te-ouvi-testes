import { type ChangeEvent } from "react";

interface InputGenericoProps {
  id: string;
  value: string;
  disableInput:boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputGenerico({ id, value, onChange, disableInput}: InputGenericoProps) {
  return (
    <div className="flex flex-col">
      <input
        className={`
          appearance-none outline-none
          w-[500px] h-[35px] pl-1 rounded-[5px]
          border border-solid
          ${disableInput ? "bg-[#EEEEEE] border-[#888888] text-[#888888]" : "border-[#D43F5D] text-[#5C1B35] focus:border-[#5C1B35] focus:bg-[#EEEEEE]"}
        `}
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disableInput}
      />
    </div>
  );
}
