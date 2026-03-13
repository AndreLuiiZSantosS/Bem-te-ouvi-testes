import { type ChangeEvent } from "react";

interface TextAreaGenericoProps {
  id: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaGenerico({
  id,
  name,
  value = "",
  onChange,
}: TextAreaGenericoProps) {
  return (
    <div className="flex flex-col">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="
          max-w-[500px] min-w-[500px] 
          max-h-[270px] min-h-[270px]
          appearance-none outline-none 
          resize-none
          text-[#5C1B35]
          border-[1.5px] border-solid border-[#D43F5D] rounded-[5px]
          focus:border-[#5C1B35] focus:bg-[#EEEEEE]
          pl-1
        "
      />
    </div>
  );
}
