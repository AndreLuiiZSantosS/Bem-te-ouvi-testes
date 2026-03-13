import { type ChangeEvent } from "react";

interface InputGenericoProps {
  id: string;
  name?: string;
  value: string;
  disableInput?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export default function InputGenerico({ id, name, value, onChange, disableInput = false, type = "text", className = ""}: InputGenericoProps) {
  return (
    <div className="flex flex-col">
      <input
        className={`
          appearance-none outline-none
          w-[500px] h-[35px] pl-1 rounded-[5px]
          border border-solid
          ${disableInput ? "bg-[#EEEEEE] border-[#888888] text-[#888888]" : "border-[#D43F5D] text-[#5C1B35] focus:border-[#5C1B35] focus:bg-[#EEEEEE]"}
          ${className}
        `}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disableInput}
      />
    </div>
  );
}