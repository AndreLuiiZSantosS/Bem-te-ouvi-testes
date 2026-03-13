import { useState, type ChangeEvent, useRef } from "react";

interface ImageUploadProps {
  name?: string;
  onImageChange?: (file: File | null) => void;
}

export default function ImageUpload({ name, onImageChange }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      if (onImageChange) {
        onImageChange(file);
      }
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleRemoveImage() {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    if (onImageChange) {
      onImageChange(null);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {!image ? (
        <div
          onClick={handleClick}
          className="w-[150px] h-[150px] border-2 border-dashed border-[#D43F5D] flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-rose-50 transition"
        >
          <img
            src="/icons/image.svg"
            alt="Adicionar imagem"
            className="w-[35px] h-[35px] mb-2"
          />
          <p className="text-[#D43F5D] text-[8px]">Clique aqui para adicionar imagem</p>
        </div>
      ) : (
        <div className="text-[#D43F5D] w-[150px] h-[150px] relative">
          {image && (
            <>
              <img
                src={image}
                alt="Capa selecionada"
                className="text-[#D43F5D] w-full h-full object-cover rounded-lg shadow"
              />
              <button
                onClick={handleRemoveImage}
                className="flex text-[#D43F5D] absolute top-1 right-1 text-white text-xs px-2 py-1 rounded hover:bg-rose-600"
              >
                <img src="/icons/trash.svg" alt="Remover" className="w-4 h-4" />
                Remover
              </button>
            </>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
