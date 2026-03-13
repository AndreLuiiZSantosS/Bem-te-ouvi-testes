import { useState, useEffect } from "react";
import MusicianListItem from "./MusicianListItem";

// Interfaces
interface Musician {
  id: number;
  nome_artistico: string;
  foto_perfil: string;
}

interface MusicianSearchProps {
  onAddMusician: (musician: Musician) => void;
  alreadyLinkedIds?: number[];
}

// Hook de debounce (para evitar chamadas de API em excesso)
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const MusicianSearch: React.FC<MusicianSearchProps> = ({
  onAddMusician,
  alreadyLinkedIds = [],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<Musician[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchMusicians = async () => {
      if (debouncedSearchTerm.trim() === "") {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8000/bemteouvi_api/musicos/?search=${debouncedSearchTerm}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Falha ao buscar músicos");
        }

        const data: Musician[] = await response.json();
        setResults(data);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Requisição abortada");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusicians();

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  const handleSelectMusician = (musician: Musician) => {
    onAddMusician(musician);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="relative flex flex-col w-[500px] space-y-2">
      <label
        htmlFor="musician-search"
        className="text-sm font-medium text-rose-600"
      >
        músico(s):
      </label>

      <input
        id="musician-search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Busque por um músico para adicionar..."
        className="w-full px-3 py-2 border border-[#D43F5D] rounded-md text-[#5C1B35] text-base font-sans focus:outline-none focus:ring-0 focus:border-[#5C1B35] focus:bg-[#EEEEEE]"
      />

      {(isLoading ||
        error ||
        results.length > 0 ||
        (debouncedSearchTerm && results.length === 0)) && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border 
                      border-gray-300 rounded-md shadow-lg max-h-60 
                      overflow-y-auto"
        >
          {isLoading && (
            <div className="p-3 text-gray-500">Buscando...</div>
          )}
          {error && <div className="p-3 text-red-600">{error}</div>}

          {!isLoading && results.length > 0 && (
            <div
              className="mt-1 border border-[#888888] rounded-[5px] 
                         shadow-[0px_4px_4px_#00000040] overflow-hidden 
                         bg-white overflow-y-auto max-h-[250px] 
                         divide-y divide-[#E5E7EB]"
            >
              {results.map((musician) => {
                const isAlreadyLinked = alreadyLinkedIds?.includes(musician.id);
                return (
                  <div key={musician.id}>
                    <MusicianListItem
                      as="button"
                      foto_perfil={musician.foto_perfil}
                      nome_artistico={musician.nome_artistico}
                      onClick={
                        isAlreadyLinked
                          ? undefined
                          : () => handleSelectMusician(musician)
                      }
                    >
                      {isAlreadyLinked && (
                        <span className="text-green-600 font-bold text-sm">
                          Adicionado ✓
                        </span>
                      )}
                    </MusicianListItem>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading &&
            !error &&
            results.length === 0 &&
            debouncedSearchTerm && (
              <div className="p-3 text-gray-500">
                Nenhum músico encontrado.
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MusicianSearch;
