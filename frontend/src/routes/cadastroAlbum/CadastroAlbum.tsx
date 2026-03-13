import Button from "../../components/Button";
import ImageUpload from "../../components/ImageUpload";
import LabelGenerico from "../../components/genericos/LabelGenerico";
import InputGenerico from "../../components/genericos/InputGenerico";
import MusiciansSearch from "../../components/cadastroAlbum/MusiciansSearch";
import SelectGenerico from "../../components/genericos/SelectGenerico";

import { Form, useActionData, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import ContainerMigalhaPao from "../../components/ContainerMigalhaPao";

interface Musician {
  id: number;
  nome_artistico: string;
  foto_perfil: string;
}

export default function Pagina1CriarAlbum() {
    useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "musico") {
        window.location.href = "/";
      }
    }, []);




  const resultado = useActionData() as { erro?: string };
  const navigation = useNavigation();

  const [selectedMusicians, setSelectedMusicians] = useState<Musician[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [generoMusical, setGeneroMusical] = useState<string>("");

  const carregando = navigation.state === "submitting";

  const generoOptions = [
    { value: 'jazz', label: 'Jazz' },
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'classica', label: 'Clássica' },
    { value: 'hip_hop', label: 'Hip Hop' },
    { value: 'eletronica', label: 'Eletrônica' },
    { value: 'samba', label: 'Samba' },
    { value: 'MPB', label: 'MPB' },
    { value: 'forro', label: 'Forró' },
    { value: 'blues', label: 'Blues' },
    { value: 'reggae', label: 'Reggae' },
    { value: 'bossa_nova', label: 'Bossa Nova' },
    { value: 'outro', label: 'Outro' }
  ];

  const handleAddMusician = (musician: Musician): void => {
    if (!selectedMusicians.find((m) => m.id === musician.id)) {
      setSelectedMusicians((prev) => [...prev, musician]);
    }
  };

  const handleRemoveMusician = (musicianId: Musician["id"]): void => {
    setSelectedMusicians((prev) => prev.filter((m) => m.id !== musicianId));
  };

  return (
    <div className="mb-[75px]"> {/* 50px de diff entre o player o botão */}
      <div className="flex flex-row items-center gap-[16px]">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 39.5833C50 40.7292 49.0625 41.6667 47.9167 41.6667H41.6667V47.9167C41.6667 49.0625 40.7292 50 39.5833 50C38.4375 50 37.5 49.0625 37.5 47.9167V41.6667H31.25C30.1042 41.6667 29.1667 40.7292 29.1667 39.5833C29.1667 38.4375 30.1042 37.5 31.25 37.5H37.5V31.25C37.5 30.1042 38.4375 29.1667 39.5833 29.1667C40.7292 29.1667 41.6667 30.1042 41.6667 31.25V37.5H47.9167C49.0625 37.5 50 38.4375 50 39.5833ZM37.375 23.1667C37.5417 24.3125 38.6042 25.1042 39.7292 24.9167C40.875 24.75 41.6458 23.6875 41.4792 22.5625C40.2917 14.4375 33.2083 8.33333 24.9792 8.33333C15.7917 8.33333 8.3125 15.8125 8.3125 25C8.3125 33.2917 14.5 40.3958 22.7083 41.5208C22.8125 41.5208 22.8958 41.5208 23 41.5208C24.0208 41.5208 24.9167 40.7708 25.0625 39.7083C25.2083 38.5625 24.4167 37.5208 23.2708 37.3542C17.1042 36.5208 12.4792 31.1875 12.4792 24.9583C12.4792 18.0625 18.0833 12.4583 24.9792 12.4583C31.1458 12.4583 36.4583 17.0417 37.3542 23.125L37.375 23.1667ZM21.875 25C21.875 26.7292 23.2708 28.125 25 28.125C26.7292 28.125 28.125 26.7292 28.125 25C28.125 23.2708 26.7292 21.875 25 21.875C23.2708 21.875 21.875 23.2708 21.875 25ZM39.5833 0H10.4167C4.66667 0 0 4.66667 0 10.4167V39.5833C0 45.3333 4.66667 50 10.4167 50H31.25C32.3958 50 33.3333 49.0625 33.3333 47.9167C33.3333 46.7708 32.3958 45.8333 31.25 45.8333H10.4167C6.97917 45.8333 4.16667 43.0208 4.16667 39.5833V10.4167C4.16667 6.97917 6.97917 4.16667 10.4167 4.16667H39.5833C43.0208 4.16667 45.8333 6.97917 45.8333 10.4167V31.25C45.8333 32.3958 46.7708 33.3333 47.9167 33.3333C49.0625 33.3333 50 32.3958 50 31.25V10.4167C50 4.66667 45.3333 0 39.5833 0Z" fill="#D43F5D"/>
        </svg>
        <h1 className="text-[40px] text-[#D43F5D]">Criar Álbum</h1>
      </div>

      <div className="mt-[48px] ml-[30px]">
        <div className="flex flex-row items-center gap-[32px]">
          <ContainerMigalhaPao numero="1" texto="Preencher dados do álbum" tipoMigalha="vermelha" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="2" texto="Adicionar música(s)" tipoMigalha="cinza" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="3" texto="Confirmar álbum" tipoMigalha="cinza" migalhaFinal={true}/>
        </div>
      </div>

      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-[35px] 
        h-[712px] w-[500px] 
        ml-[268px] mt-[78px]"
      >
        <div className="flex flex-row gap-[16px]">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9139 49.9941H10.4154C4.66611 49.9941 0 45.3279 0 39.5786V10.4154C0 4.66611 4.66611 0 10.4154 0H39.5786C45.3279 0 49.9941 4.66611 49.9941 10.4154V20.8309C49.9941 21.9766 49.0567 22.9139 47.911 22.9139C46.7653 22.9139 45.8279 21.9766 45.8279 20.8309V10.4154C45.8279 6.97834 43.0157 4.16617 39.5786 4.16617H10.4154C6.97834 4.16617 4.16617 6.97834 4.16617 10.4154V39.5786C4.16617 43.0157 6.97834 45.8279 10.4154 45.8279H22.9139C24.0596 45.8279 24.997 46.7653 24.997 47.911C24.997 49.0567 24.0596 49.9941 22.9139 49.9941ZM24.997 28.1217C26.726 28.1217 28.1217 26.726 28.1217 24.997C28.1217 23.2681 26.726 21.8724 24.997 21.8724C23.2681 21.8724 21.8724 23.2681 21.8724 24.997C21.8724 26.726 23.2681 28.1217 24.997 28.1217ZM45.8279 31.2463C45.8279 27.8092 43.0157 24.997 39.5786 24.997C36.1415 24.997 33.3294 27.8092 33.3294 31.2463C33.3294 34.6834 36.1415 37.4955 39.5786 37.4955C43.0157 37.4955 45.8279 34.6834 45.8279 31.2463ZM48.4317 49.9316C49.5566 49.6399 50.2232 48.5151 49.9316 47.3902C48.765 42.8699 44.4114 39.5786 39.5786 39.5786C34.7459 39.5786 30.3922 42.8699 29.2257 47.3902C28.9341 48.4942 29.6006 49.6399 30.7255 49.9316C31.8295 50.2232 32.9752 49.5566 33.2669 48.4317C33.9543 45.7654 36.6623 43.7448 39.5786 43.7448C42.4949 43.7448 45.203 45.7654 45.8904 48.4317C46.1403 49.3691 46.9736 49.9941 47.911 49.9941C48.0776 49.9941 48.2651 49.9732 48.4317 49.9316ZM29.7673 40.9743C30.8713 40.641 31.4963 39.4953 31.163 38.3913C30.8297 37.2872 29.684 36.6623 28.5799 36.9956C27.4342 37.3497 26.226 37.5164 25.0179 37.5164C18.1228 37.5164 12.5193 31.9129 12.5193 25.0179C12.5193 18.1228 18.1228 12.5193 25.0179 12.5193C29.8298 12.5193 34.2459 15.3315 36.3082 19.6643C36.8081 20.7059 38.0371 21.1433 39.0787 20.6434C40.1202 20.1434 40.5577 18.9144 40.0577 17.8729C37.3081 12.0819 31.3921 8.35317 24.997 8.35317C15.8106 8.35317 8.33234 15.8315 8.33234 25.0179C8.33234 34.2043 15.8106 41.6825 24.997 41.6825C26.6218 41.6825 28.2258 41.4534 29.7673 40.9951V40.9743Z" fill="#D43F5D"/>
          </svg>
          <h2 className="text-[36px] text-[#D43F5D]">Preencher dados do álbum</h2>
        </div>

        <div>
          <ImageUpload name="imagem_capa" />
        </div>

        <div>
          <LabelGenerico id="titulo" labelGenerico="título" />
          <InputGenerico
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <LabelGenerico id="generoMusical" labelGenerico="gênero musical" />
          <SelectGenerico
            id="generoMusical"
            name="genero"
            value={generoMusical}
            options={generoOptions}
            onChange={(e) => setGeneroMusical(e.target.value)}
          />
        </div>

        <div>
          <MusiciansSearch
            onAddMusician={handleAddMusician}
            alreadyLinkedIds={selectedMusicians.map((m) => m.id)}
          />

          <div className="flex flex-wrap gap-2 pt-2">
            {selectedMusicians.map((musician) => (
              <span
                key={musician.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium"
              >
                <img
                  src={musician.foto_perfil}
                  className="w-4 h-4 rounded-full"
                  alt={musician.nome_artistico}
                />
                {musician.nome_artistico}
                <button
                  type="button"
                  onClick={() => handleRemoveMusician(musician.id)}
                  className="ml-1 text-rose-500 hover:text-rose-700"
                  aria-label={`Remover ${musician.nome_artistico}`}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          
          {/* Hidden input para enviar os IDs dos músicos */}
          <input
            type="hidden"
            name="musicos"
            value={JSON.stringify(selectedMusicians.map((m) => m.id))}
          />
        </div>

        {resultado?.erro && (
          <p className="text-red-500 whitespace-pre-wrap">
            {resultado.erro}
          </p>
        )}

        <div className="self-end">
          <Button
            text={carregando ? "Enviando..." : "Avançar"}
            variant="proximo"
            type="submit"
            disabled={carregando}
          />
        </div>
      </Form>
    </div>
  );
}
