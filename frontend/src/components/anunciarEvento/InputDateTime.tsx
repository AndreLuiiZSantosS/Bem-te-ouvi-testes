import { type ChangeEvent } from "react";

interface InputDateTimeProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputDateTime({ id, value, onChange }: InputDateTimeProps) {
  const handleIconClick = () => {
    const input = document.querySelector<HTMLInputElement>(`#${id}`);
    if (input) {
      input.showPicker?.(); 
      input.focus();
    }
  };

  return (
    <div className="relative w-[500px] flex items-center">
      <input
        id={id}
        type="datetime-local"
        value={value ? value.slice(0, 16) : ""} 
        onChange={onChange}
        className={`
          appearance-none outline-none
          w-full h-[35px] pl-2 pr-10 rounded-[5px]
          border border-solid border-[#D43F5D] text-[#5C1B35]
          focus:border-[#5C1B35] focus:bg-[#EEEEEE]
          transition-colors duration-150
          [&::-webkit-calendar-picker-indicator]:hidden
          [&::-moz-calendar-picker-indicator]:hidden
        `}
      />

      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5H3.75C3.06063 7.5 2.5 8.06063 2.5 8.75V10C2.5 10.6894 3.06063 11.25 3.75 11.25H5C5.68937 11.25 6.25 10.6894 6.25 10V8.75C6.25 8.06063 5.68937 7.5 5 7.5ZM3.75 10V8.75H5V10H3.75ZM11.875 1.25H11.25V0.625C11.25 0.28 10.9706 0 10.625 0C10.2794 0 10 0.28 10 0.625V1.25H5V0.625C5 0.28 4.72062 0 4.375 0C4.02938 0 3.75 0.28 3.75 0.625V1.25H3.125C1.40188 1.25 0 2.65188 0 4.375V11.875C0 13.5981 1.40188 15 3.125 15H11.875C13.5981 15 15 13.5981 15 11.875V4.375C15 2.65188 13.5981 1.25 11.875 1.25ZM3.125 2.5H11.875C12.9087 2.5 13.75 3.34125 13.75 4.375V5H1.25V4.375C1.25 3.34125 2.09125 2.5 3.125 2.5ZM11.875 13.75H3.125C2.09125 13.75 1.25 12.9087 1.25 11.875V6.25H13.75V11.875C13.75 12.9087 12.9087 13.75 11.875 13.75Z"
            fill="#D43F5D"
          />
        </svg>
      </button>
    </div>
  );
}
