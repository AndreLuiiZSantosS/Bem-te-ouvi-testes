import { type ChangeEvent } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectGenericoProps {
  id: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

export default function SelectGenerico({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
}: SelectGenericoProps) {
  return (
    <div className="relative w-[500px]">
      <select
        id={id}
        name={name || "SelectGenerico"}
        value={value}
        onChange={onChange}
        className="
          appearance-none outline-none
          w-full h-[35px] px-3 pr-8 pl-1
          text-[#5C1B35]
          border border-solid border-[#D43F5D] rounded-[5px]
          focus:border-[#5C1B35] focus:bg-[#EEEEEE]
          cursor-pointer
        "
      >
        <option value="" disabled hidden>
          {placeholder || "Selecione..."}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Ícone da setinha */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_160_7)">
          <path
            d="M0.000128746 4.37496C-0.000347137 4.29271 0.0154181 4.21117 0.0465212 4.13502C0.0776243 4.05887 0.123453 3.98961 0.181379 3.93121C0.239481 3.87263 0.308606 3.82614 0.384768 3.7944C0.46093 3.76267 0.542621 3.74634 0.625129 3.74634C0.707636 3.74634 0.789327 3.76267 0.865489 3.7944C0.941651 3.82614 1.01078 3.87263 1.06888 3.93121L6.17513 9.03746C6.52669 9.38859 7.00325 9.58581 7.50013 9.58581C7.997 9.58581 8.47357 9.38859 8.82513 9.03746L13.9314 3.93121C14.0491 3.81352 14.2087 3.7474 14.3751 3.7474C14.5416 3.7474 14.7012 3.81352 14.8189 3.93121C14.9366 4.0489 15.0027 4.20852 15.0027 4.37496C15.0027 4.5414 14.9366 4.70102 14.8189 4.81871L9.71263 9.92496C9.42234 10.216 9.0775 10.4469 8.69784 10.6044C8.31818 10.762 7.91117 10.843 7.50013 10.843C7.08908 10.843 6.68208 10.762 6.30242 10.6044C5.92276 10.4469 5.57791 10.216 5.28763 9.92496L0.181379 4.81871C0.123453 4.76031 0.0776243 4.69105 0.0465212 4.6149C0.0154181 4.53875 -0.000347137 4.45722 0.000128746 4.37496Z"
            fill="#D43F5D"
          />
        </g>
        <defs>
          <clipPath id="clip0_160_7">
            <rect
              width="15"
              height="15"
              fill="white"
              transform="matrix(0 1 -1 0 15 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
