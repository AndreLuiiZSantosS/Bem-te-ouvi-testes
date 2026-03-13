// Arquivo: src/components/MusicianListItem.jsx (COM STYLE INLINE PARA TESTE)
import * as React from "react";


interface MusicianListItemProps {
  as?: React.ElementType;
  foto_perfil: string;
  nome_artistico: string;
  subtitle?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const MusicianListItem: React.FC<MusicianListItemProps> = ({ 
  as: Tag = 'div', 
  foto_perfil, 
  nome_artistico, 
  subtitle, 
  onClick, 
  children 
}) => {
  
  const clickableClasses = onClick ? "cursor-pointer hover:bg-[#d43f5d]" : ""; 

  return (
    <Tag 
      onClick={onClick} 
      disabled={Tag === 'button' && !onClick}
      className={`group w-full flex items-center gap-2 px-2 py-1 bg-red transition-colors duration-200 ease ${clickableClasses}`}
    >
      <img 
        src={foto_perfil} 
        alt={nome_artistico} 
        className="w-7 h-7 rounded-full object-cover flex-shrink-0" 
        style={{ 
          width: '40px',       
          height: '40px',      
          borderRadius: '50%', 
          objectFit: 'cover',  
          flexShrink: 0        
        }}
      />
      {/* Container de texto */}
      <div className="flex-grow flex items-center"> 
        <p className="text-[15px] text-[#888888] whitespace-nowrap transition-colors duration-200 ease">
          {nome_artistico}
        </p>
        {subtitle && (
          <p className="ml-2 text-[10px] text-[#5c1b35] whitespace-nowrap transition-colors duration-200 ease">
            {subtitle}
          </p>
        )}
      </div>
      <div className="text-sm flex-shrink-0 ml-auto transition-colors duration-200 ease"> 
        {children}
      </div>
    </Tag>
  );
};

export default MusicianListItem;