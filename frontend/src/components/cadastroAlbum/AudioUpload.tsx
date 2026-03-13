import React, { useState, type ChangeEvent } from "react";

interface AudioUploadProps {
  id: string;
  name?: string;
  onAudioChange: (file: File | null) => void;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ id, name = "audio_file", onAudioChange }) => {
  const [fileName, setFileName] = useState<string>("Nenhum arquivo selecionado");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      onAudioChange(file);
    } else {
      setFileName("Nenhum arquivo selecionado");
      onAudioChange(null);
    }
  };

  const handleClick = (): void => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) {
      input.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <label className="text-[#D43F5D] font-medium">arquivo de áudio:</label>

      <div className="flex border-[1.5px] border-[#D43F5D] rounded-md overflow-hidden">
        {/* Botão de upload */}
        <button
          type="button"
          onClick={handleClick}
          className="p-4 flex items-center gap-2 bg-transparent text-[#D43F5D] text-[16px] font-medium hover:bg-rose-50 transition border-0 outline-none"
        >
          <img
            src="/icons/upload-audio.svg"
            alt="Upload"
            className="w-4 h-4"
          />
          carregar arquivo
        </button>

        {/* Separador */}
        <div className="border-l border-[#D43F5D]" />

        {/* Nome do arquivo */}
        <span className="p-4 flex-1 text-[#888888] text-[16px] truncate bg-white">
          {fileName}
        </span>

        {/* Input escondido */}
        <input
          id={id}
          name={name}
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AudioUpload;
