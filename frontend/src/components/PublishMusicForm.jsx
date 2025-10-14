import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, X, Music, ChevronDown } from 'lucide-react';

const GenreSelector = () => {
  const availableGenres = ['Rock', 'Sertanejo', 'Eletrônica', 'K-Pop', 'Samba', 'MPB', 'Funk', 'Rap'];
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleGenre = (genre) => {
    setSelectedGenres(
      selectedGenres.includes(genre)
        ? selectedGenres.filter((g) => g !== genre)
        : [...selectedGenres, genre]
    );
  };

  const handleRemoveGenre = (genreToRemove) => {
    setSelectedGenres(selectedGenres.filter(genre => genre !== genreToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Gênero:
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 bg-white border border-gray-300 rounded-md flex justify-between items-center text-left"
        >
          <span className="text-gray-500">Selecione os gêneros</span>
          <ChevronDown size={20} className={`text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul>
              {availableGenres.map((genre) => (
                <li
                  key={genre}
                  onClick={() => handleToggleGenre(genre)}
                  className={`p-2 cursor-pointer hover:bg-custom-pink hover:text-white ${selectedGenres.includes(genre) ? 'bg-custom-pink text-white font-semibold' : ''}`}
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 min-h-[28px]">
        {selectedGenres.map((genre) => (
          <div key={genre} className="flex items-center gap-1 bg-custom-pink/20 text-custom-pink text-xs font-semibold px-2 py-1 rounded-full">
            {genre}
            <button type="button" onClick={() => handleRemoveGenre(genre)}>
              <X size={14} className="cursor-pointer" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PublishMusicForm = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleAudioChange = (e) => e.target.files[0] && setAudioFile(e.target.files[0]);
  const handleImageChange = (e) => e.target.files[0] && setImageFile(URL.createObjectURL(e.target.files[0]));

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto font-sans w-full">
      <div className="flex items-center gap-3 mb-8">
        <Music className="text-custom-pink" size={32} />
        <h1 className="font-title text-3xl font-bold text-gray-800">Publicar Música</h1>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="w-48 h-48 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 flex flex-col justify-center items-center text-gray-500 hover:bg-gray-200 hover:border-gray-400 transition-colors">
                {imageFile ? (
                  <img src={imageFile} alt="Prévia" className="w-full h-full object-cover rounded-md" />
                ) : (
                  <>
                    <ImageIcon size={48} />
                    <span className="mt-2 text-sm">Capa do álbum</span>
                  </>
                )}
              </div>
            </label>
            <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título:
              </label>
              <input
                id="titulo"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-custom-pink focus:border-custom-pink"
              />
            </div>
            <GenreSelector />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Áudio:
              </label>
              <div className="flex items-center gap-4">
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload size={16} className="mr-2" />
                  Enviar áudio
                </label>
                <span className="text-sm text-gray-500 truncate">
                  {audioFile ? audioFile.name : 'Nenhum arquivo selecionado'}
                </span>
                <input id="audio-upload" type="file" className="hidden" accept="audio/*" onChange={handleAudioChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-custom-pink text-white font-bold py-3 px-8 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-pink transition-opacity"
          >
            Publicar Música
          </button>
        </div>
      </form>
    </div>
  );
};