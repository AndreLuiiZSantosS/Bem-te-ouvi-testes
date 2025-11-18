const ListarMusicas = () => {
  return (
    <div>
      <div className="w-full space-y-3">
        <label className="text-[#888888] mb-1 text-[16.4px] font-sans">
          músicas:
        </label>

        <div className="space-y-3 mt-1">
          <div className="flex items-center justify-between p-3 bg-white shadow border-2 border-transparent">
            {/* --- Capa e informações da música --- */}
            <div className="flex items-center gap-3">
              <img
                src="https://placehold.co/48x48/4f46e5/ffffff?text=Capa"
                alt="Capa da música Mega Sena"
                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
              />
              <div>
                <p className="font-medium text-gray-900">Mega Sena</p>
                <p className="text-sm text-gray-500">Rythm e Pablo</p>
              </div>
            </div>

            {/* --- Ações: ouvir / excluir / opções --- */}
            <div className="flex items-center gap-4 flex-shrink-0 ml-2">
              {/* Botão ouvir */}
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L8.029 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  />
                </svg>
                <span>ouvir</span>
              </button>

              {/* Botão excluir */}
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-rose-600 hover:text-rose-800 transition-colors"
              >
                <svg
                  version="1.1"
                  viewBox="0 0 78 82"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke="none"
                    d="m30.5 34.6v10.1c0 1.8-.24 3.7.75 5.3 1.79 2.88 5.32 2.32 8.25 2.32 1.35 0 2.74.15 4.02-.36 1.07-.42 1.95-1.21 2.5-2.2.86-1.56.6-3.45.6-5.16v-9.99h1.6c.63 0 1.15-.1 1.6-.19.63-.41.53-1.39-.14-1.7-.36-.17-.82-.1-1.21-.1h-2.37c-.15-1.83-1.95-3.37-3.68-3.79-.82-.2-1.68-.14-2.52-.14-1.28 0-2.43.1-3.53.81-.71.46-1.29 1.1-1.68 1.84-.15.29-.26 1.06-.52 1.23-.19.13-.62.05-.85.05h-3.07c-.09.15-.12.3-.12.47-.02 1.12 1.17 1.04 1.98 1.04zm11.9-1.99h-7.69c.74-2.11 3.31-2.21 5.23-1.95 1.03.14 2.27.86 2.47 1.95z"
                  />
                </svg>
                <span>excluir</span>
              </button>

              {/* Botão opções */}
              <button
                type="button"
                className="text-rose-600 hover:text-rose-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM8.5 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM14 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarMusicas;
