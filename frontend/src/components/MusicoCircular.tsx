import { useNavigate } from "react-router-dom";

interface MusicoCircularProps {
    id: number;
    nomeArtistico: string;
    fotoPerfil?: string;
    qtdFas?: number; // Opcional, caso você queira passar a quantidade de fãs no futuro
}

export default function MusicoCircular({ id, nomeArtistico, fotoPerfil, qtdFas }: MusicoCircularProps) {
    const navigate = useNavigate();

    // Função para tratar a URL da imagem (igual aos outros componentes)
    const getImageUrl = (path?: string) => {
        if (!path) return '/avatar-default.png'; // Coloque uma imagem padrão na pasta public ou deixe null
        if (path.startsWith('http')) return path;
        return `http://localhost:8000${path}`;
    };

    const imageUrl = getImageUrl(fotoPerfil);

    return (
        <div 
            className="flex flex-col items-center cursor-pointer group w-[150px]"
            onClick={() => navigate(`/perfil/${id}`)} // Ajuste a rota conforme seu Router
        >
            {/* Círculo da Imagem */}
            <div className="w-[150px] h-[150px] rounded-full bg-[#D9D9D9] overflow-hidden border-2 border-transparent group-hover:border-[#D43F5D] transition-all duration-200">
                <img 
                    src={imageUrl} 
                    alt={nomeArtistico}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Se a imagem falhar ao carregar, coloca uma cor de fundo ou imagem padrão
                        e.currentTarget.src = '/avatar-default.png'; 
                        // ou: e.currentTarget.style.display = 'none';
                    }}
                />
            </div>

            {/* Texto */}
            <div className="flex flex-col items-center mt-3 text-center">
                <span className="text-[#D43F5D] font-medium text-lg leading-tight line-clamp-2 group-hover:text-[#5C1B35] transition-colors">
                    {nomeArtistico}
                </span>
                
                {/* Só renderiza fãs se o valor for passado */}
                {qtdFas !== undefined && (
                    <span className="text-[#888888] text-sm">
                        {qtdFas} fãs
                    </span>
                )}
            </div>
        </div>
    );
}