import Title from '../components/Title'
import ContainerMigalhaPao from '../components/ContainerMigalhaPao'
import MigalhaPao from '../components/MigalhaPao'
import LabelGenerico from '../components/genericos/LabelGenerico'
import InputGenerico from '../components/genericos/InputGenerico'
import AudioUpload from '../components/cadastroAlbum/AudioUpload'
import SelectGenerico from '../components/genericos/SelectGenerico'
import TextAreaGenerico from '../components/genericos/TextAreaGenerico'
import Button from '../components/Button'

import { useNavigate, useParams } from 'react-router-dom'
import { useState, type FormEvent, type ChangeEvent } from 'react'; 

const CadastroMusica = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const [titulo, setTitulo] = useState<string>('');
  const [generoMusical, setGeneroMusical] = useState<string>('');
  const [letra, setLetra] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const generoOptions = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'mpb', label: 'MPB (Música Popular Brasileira)' },
    { value: 'sertanejo', label: 'Sertanejo' },
    { value: 'samba', label: 'Samba' },
    { value: 'hip_hop', label: 'Hip Hop / Rap' },
    { value: 'eletronica', label: 'Eletrônica' },
    { value: 'outro', label: 'Outro' }
  ];

  const handleAddMusic = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!albumId) {
        setError("Nenhum álbum selecionado. Volte para o passo anterior.");
        return;
    }
    if (!audioFile) {
        setError("Por favor, adicione o arquivo de áudio da música.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('genero', generoMusical);
    formData.append('letra', letra);
    formData.append('audio_file', audioFile); 
    formData.append('album', albumId);       

    try {
        
        const response = await fetch('http://localhost:8000/bemteouvi_api/musicas/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Falha ao adicionar a música.');
        }

        setSuccess(`Música "${titulo}" adicionada com sucesso!`);
        setTitulo('');
        setGeneroMusical('');
        setLetra('');
        setAudioFile(null);
        const audioInput = document.getElementById('audio-upload') as HTMLInputElement;
        if(audioInput) audioInput.value = "";
        
    } catch (err: any) {
        setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="mb-[234px]"> {/* 50px de diff entre o player o botão */}
      <div className="flex flex-row items-center gap-[16px]">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 39.5833C50 40.7292 49.0625 41.6667 47.9167 41.6667H41.6667V47.9167C41.6667 49.0625 40.7292 50 39.5833 50C38.4375 50 37.5 49.0625 37.5 47.9167V41.6667H31.25C30.1042 41.6667 29.1667 40.7292 29.1667 39.5833C29.1667 38.4375 30.1042 37.5 31.25 37.5H37.5V31.25C37.5 30.1042 38.4375 29.1667 39.5833 29.1667C40.7292 29.1667 41.6667 30.1042 41.6667 31.25V37.5H47.9167C49.0625 37.5 50 38.4375 50 39.5833ZM37.375 23.1667C37.5417 24.3125 38.6042 25.1042 39.7292 24.9167C40.875 24.75 41.6458 23.6875 41.4792 22.5625C40.2917 14.4375 33.2083 8.33333 24.9792 8.33333C15.7917 8.33333 8.3125 15.8125 8.3125 25C8.3125 33.2917 14.5 40.3958 22.7083 41.5208C22.8125 41.5208 22.8958 41.5208 23 41.5208C24.0208 41.5208 24.9167 40.7708 25.0625 39.7083C25.2083 38.5625 24.4167 37.5208 23.2708 37.3542C17.1042 36.5208 12.4792 31.1875 12.4792 24.9583C12.4792 18.0625 18.0833 12.4583 24.9792 12.4583C31.1458 12.4583 36.4583 17.0417 37.3542 23.125L37.375 23.1667ZM21.875 25C21.875 26.7292 23.2708 28.125 25 28.125C26.7292 28.125 28.125 26.7292 28.125 25C28.125 23.2708 26.7292 21.875 25 21.875C23.2708 21.875 21.875 23.2708 21.875 25ZM39.5833 0H10.4167C4.66667 0 0 4.66667 0 10.4167V39.5833C0 45.3333 4.66667 50 10.4167 50H31.25C32.3958 50 33.3333 49.0625 33.3333 47.9167C33.3333 46.7708 32.3958 45.8333 31.25 45.8333H10.4167C6.97917 45.8333 4.16667 43.0208 4.16667 39.5833V10.4167C4.16667 6.97917 6.97917 4.16667 10.4167 4.16667H39.5833C43.0208 4.16667 45.8333 6.97917 45.8333 10.4167V31.25C45.8333 32.3958 46.7708 33.3333 47.9167 33.3333C49.0625 33.3333 50 32.3958 50 31.25V10.4167C50 4.66667 45.3333 0 39.5833 0Z" fill="#D43F5D"/>
        </svg>
        <h1 className="text-[40px] text-[#D43F5D]">Criar Álbum</h1>
      </div>

      <div className="mt-[48px] ml-[30px]">
        <div className="flex flex-row items-center gap-[32px]">
          <ContainerMigalhaPao numero="1" texto="Preencher dados do álbum" tipoMigalha="vermelha" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="2" texto="Adicionar música(s)" tipoMigalha="vermelha" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="3" texto="Confirmar álbum" tipoMigalha="cinza" migalhaFinal={true}/>
        </div>
      </div>

      <form 
        className="flex flex-col gap-[35px]
        h-[712px] w-[500px]
        ml-[268px] mt-[78px]"
        onSubmit={handleAddMusic}
        >
        {/* div para o título e o ícone ficarem na mesma linha */}
        <div className="flex flex-row items-center gap-[16px]">
          {/* ícone de adicionar música */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_148_83)">
              <path
                d="M10.4167 20.8333C10.4167 19.6833 11.35 18.75 12.5 18.75H18.75V12.5C18.75 11.35 19.6833 10.4167 20.8333 10.4167C21.9833 10.4167 22.9167 11.35 22.9167 12.5V18.75H29.1667C30.3167 18.75 31.25 19.6833 31.25 20.8333C31.25 21.9833 30.3167 22.9167 29.1667 22.9167H22.9167V29.1667C22.9167 30.3167 21.9833 31.25 20.8333 31.25C19.6833 31.25 18.75 30.3167 18.75 29.1667V22.9167H12.5C11.35 22.9167 10.4167 21.9833 10.4167 20.8333ZM50 18.75V39.5833C50 45.3271 45.3271 50 39.5833 50H18.75C13.6542 50 9.41875 46.3167 8.525 41.475C3.68333 40.5812 0 36.3458 0 31.25V10.4167C0 4.67292 4.67292 0 10.4167 0H31.25C36.3458 0 40.5812 3.68333 41.475 8.525C46.3167 9.41875 50 13.6542 50 18.75ZM10.4167 37.5H31.25C34.6958 37.5 37.5 34.6958 37.5 31.25V10.4167C37.5 6.97083 34.6958 4.16667 31.25 4.16667H10.4167C6.97083 4.16667 4.16667 6.97083 4.16667 10.4167V31.25C4.16667 34.6958 6.97083 37.5 10.4167 37.5ZM45.8333 18.75C45.8333 16.0375 44.0854 13.7458 41.6667 12.8833V31.25C41.6667 36.9937 36.9937 41.6667 31.25 41.6667H12.8833C13.7458 44.0854 16.0375 45.8333 18.75 45.8333H39.5833C43.0292 45.8333 45.8333 43.0292 45.8333 39.5833V18.75Z"
                fill="#D43F5D"
              />
            </g>
            <defs>
              <clipPath id="clip0_148_83">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h2 className="text-[36px] text-[#D43F5D]">Adicionar música(s)</h2>

        </div>
        <div>
          <LabelGenerico labelGenerico="título" id="titulo" />
          <InputGenerico 
            id='titulo'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <LabelGenerico labelGenerico="gênero musical" id="generoMusical" />
          <SelectGenerico 
            id='generoMusical'
            value={generoMusical}
            options={generoOptions}
            onChange={(e) => setGeneroMusical(e.target.value)}
          />
        </div>

        <div>
          <LabelGenerico labelGenerico="letra" id="letra" />
          <TextAreaGenerico 
            id="letra" 
            value={letra}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setLetra(e.target.value)}/>
        </div>

        <AudioUpload 
          id="audio-upload"
          onAudioChange={(file) => setAudioFile(file)}
          />

        {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                <strong>Error:</strong> {error}
            </div>
        )}
        {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                <strong>Sucesso:</strong> {success}
            </div>
        )}

        <div className="flex gap-[25px] self-end">
          <Button text="Voltar" variant="voltar" onClick={() => navigate('/criarAlbum/1')} />
          <Button 
            text={isLoading ? "Adicionando..." : "Música"} 
            variant="adicionar" onClick={() => {/* lógica adicionar */ }}
            type="submit"
            disabled={isLoading} />
          <Button 
            text="Avançar" 
            variant="proximo" 
            type="button"
            onClick={() => navigate('/criarAlbum/3')} />
        </div>
      </form>
    </div>
  )
}

export default CadastroMusica