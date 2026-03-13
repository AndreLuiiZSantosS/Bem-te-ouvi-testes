import InputGenerico from '../../components/genericos/InputGenerico'
import LabelGenerico from '../../components/genericos/LabelGenerico'
import Button from '../../components/Button'
import { useNavigate, useLoaderData, Form, useActionData, useNavigation } from 'react-router-dom'
import LinkedMusiciansList from '../../components/cadastroAlbum/LinkedMusiciansSearch'
import ContainerMigalhaPao from '../../components/ContainerMigalhaPao'
import ImageUpload from '../../components/ImageUpload'
import SelectGenerico from '../../components/genericos/SelectGenerico'
import { useState } from 'react'

interface Album {
  id: number
  titulo: string
  genero: string
  imagem_capa?: string
}

interface Musica {
  id: number
  titulo: string
  genero: string
  audio?: string
}

interface Musico {
  id: number
  nome_artistico: string
  foto_perfil?: string
}

interface LoaderData {
  album: Album
  musicas: Musica[]
  musicos: Musico[]
}

const ConfirmarAlbum = () => {
  const { album, musicas, musicos } = useLoaderData() as LoaderData
  const resultado = useActionData() as { erro?: string; sucesso?: string }
  const navigation = useNavigation()
  const navigate = useNavigate()

  const [titulo, setTitulo] = useState<string>(album.titulo || '')
  const [genero, setGenero] = useState<string>(album.genero || '')
  const [capaUrl, setCapaUrl] = useState<string>(album.imagem_capa || '/imagemAlbum.png')

  const isSubmitting = navigation.state === 'submitting'

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
  ]

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Atualizar preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapaUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteMusica = (musicaId: number) => {
    if (confirm('Tem certeza que deseja excluir esta música?')) {
      const formData = new FormData()
      formData.append('_action', 'delete-musica')
      formData.append('musica_id', musicaId.toString())
      // Você pode usar useFetcher para fazer isso sem recarregar a página
      // Por enquanto, vamos deixar para implementação futura
    }
  }
  return (
    <div className="mb-[299px]">
      <div className="flex flex-row items-center gap-[16px]">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 39.5833C50 40.7292 49.0625 41.6667 47.9167 41.6667H41.6667V47.9167C41.6667 49.0625 40.7292 50 39.5833 50C38.4375 50 37.5 49.0625 37.5 47.9167V41.6667H31.25C30.1042 41.6667 29.1667 40.7292 29.1667 39.5833C29.1667 38.4375 30.1042 37.5 31.25 37.5H37.5V31.25C37.5 30.1042 38.4375 29.1667 39.5833 29.1667C40.7292 29.1667 41.6667 30.1042 41.6667 31.25V37.5H47.9167C49.0625 37.5 50 38.4375 50 39.5833ZM37.375 23.1667C37.5417 24.3125 38.6042 25.1042 39.7292 24.9167C40.875 24.75 41.6458 23.6875 41.4792 22.5625C40.2917 14.4375 33.2083 8.33333 24.9792 8.33333C15.7917 8.33333 8.3125 15.8125 8.3125 25C8.3125 33.2917 14.5 40.3958 22.7083 41.5208C22.8125 41.5208 22.8958 41.5208 23 41.5208C24.0208 41.5208 24.9167 40.7708 25.0625 39.7083C25.2083 38.5625 24.4167 37.5208 23.2708 37.3542C17.1042 36.5208 12.4792 31.1875 12.4792 24.9583C12.4792 18.0625 18.0833 12.4583 24.9792 12.4583C31.1458 12.4583 36.4583 17.0417 37.3542 23.125L37.375 23.1667ZM21.875 25C21.875 26.7292 23.2708 28.125 25 28.125C26.7292 28.125 28.125 26.7292 28.125 25C28.125 23.2708 26.7292 21.875 25 21.875C23.2708 21.875 21.875 23.2708 21.875 25ZM39.5833 0H10.4167C4.66667 0 0 4.66667 0 10.4167V39.5833C0 45.3333 4.66667 50 10.4167 50H31.25C32.3958 50 33.3333 49.0625 33.3333 47.9167C33.3333 46.7708 32.3958 45.8333 31.25 45.8333H10.4167C6.97917 45.8333 4.16667 43.0208 4.16667 39.5833V10.4167C4.16667 6.97917 6.97917 4.16667 10.4167 4.16667H39.5833C43.0208 4.16667 45.8333 6.97917 45.8333 10.4167V31.25C45.8333 32.3958 46.7708 33.3333 47.9167 33.3333C49.0625 33.3333 50 32.3958 50 31.25V10.4167C50 4.66667 45.3333 0 39.5833 0Z" fill="#D43F5D" />
        </svg>
        <h1 className="text-[40px] text-[#D43F5D]">Criar Álbum</h1>
      </div>

      <div className="mt-[48px] ml-[30px]">
        <div className="flex flex-row items-center gap-[32px]">
          <ContainerMigalhaPao numero="1" texto="Preencher dados do álbum" tipoMigalha="vermelha" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="2" texto="Adicionar música(s)" tipoMigalha="vermelha" migalhaFinal={false}/>
          <ContainerMigalhaPao numero="3" texto="Confirmar álbum" tipoMigalha="vermelha" migalhaFinal={true}/>
        </div>
      </div>

      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-[35px] h-[712px] w-[500px] ml-[268px] mt-[78px]"
      >
        <div className="flex flex-row gap-[16px]">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_160_130)">
              <path d="M8.33326 12.4999C7.51191 12.5021 6.69828 12.3413 5.93946 12.027C5.18063 11.7127 4.49166 11.251 3.91242 10.6687L0.695757 7.80616C0.283014 7.43817 0.0333582 6.9213 0.00171147 6.36924C-0.0299353 5.81717 0.159019 5.27515 0.527007 4.86241C0.894995 4.44967 1.41187 4.20001 1.96393 4.16837C2.51599 4.13672 3.05801 4.32567 3.47076 4.69366L6.77284 7.63949C6.96187 7.85178 7.19235 8.02313 7.45008 8.14301C7.70782 8.26289 7.98736 8.32876 8.2715 8.33657C8.55564 8.34438 8.83838 8.29395 9.10231 8.1884C9.36623 8.08286 9.60577 7.92441 9.80617 7.72283L17.3145 0.574911C17.7182 0.215474 18.2459 0.0270336 18.786 0.049392C19.3261 0.0717503 19.8363 0.303156 20.209 0.694734C20.5816 1.08631 20.7875 1.6074 20.7831 2.14793C20.7787 2.68847 20.5643 3.20613 20.1853 3.59158L12.7083 10.7041C12.1328 11.2762 11.4502 11.7293 10.6995 12.0374C9.9488 12.3456 9.14473 12.5027 8.33326 12.4999ZM49.9999 8.33324C49.9999 7.78071 49.7804 7.25081 49.3897 6.86011C48.999 6.4694 48.4691 6.24991 47.9166 6.24991H27.0833C26.5307 6.24991 26.0008 6.4694 25.6101 6.86011C25.2194 7.25081 24.9999 7.78071 24.9999 8.33324C24.9999 8.88578 25.2194 9.41568 25.6101 9.80638C26.0008 10.1971 26.5307 10.4166 27.0833 10.4166H47.9166C48.4691 10.4166 48.999 10.1971 49.3897 9.80638C49.7804 9.41568 49.9999 8.88578 49.9999 8.33324ZM12.7083 27.3707L20.1853 20.2582C20.394 20.0725 20.5632 19.8466 20.6828 19.5941C20.8024 19.3415 20.87 19.0676 20.8816 18.7884C20.8932 18.5092 20.8484 18.2306 20.7501 17.969C20.6518 17.7075 20.5018 17.4684 20.3092 17.266C20.1166 17.0636 19.8852 16.902 19.6289 16.7908C19.3725 16.6797 19.0964 16.6212 18.817 16.6189C18.5376 16.6167 18.2606 16.6706 18.0025 16.7776C17.7444 16.8845 17.5104 17.0423 17.3145 17.2416L9.81451 24.3895C9.41791 24.7687 8.89032 24.9804 8.34159 24.9804C7.79286 24.9804 7.26527 24.7687 6.86867 24.3895L3.55617 21.0874C3.16325 20.7079 2.637 20.4979 2.09075 20.5027C1.54451 20.5074 1.02199 20.7265 0.635718 21.1128C0.249451 21.4991 0.0303495 22.0216 0.0256028 22.5678C0.0208561 23.1141 0.230844 23.6403 0.61034 24.0332L3.91242 27.3353C5.07841 28.5016 6.65808 29.1597 8.30721 29.1664C9.95634 29.173 11.5413 28.5276 12.7166 27.3707H12.7083ZM49.9999 24.9999C49.9999 24.4474 49.7804 23.9175 49.3897 23.5268C48.999 23.1361 48.4691 22.9166 47.9166 22.9166H27.0833C26.5307 22.9166 26.0008 23.1361 25.6101 23.5268C25.2194 23.9175 24.9999 24.4474 24.9999 24.9999C24.9999 25.5524 25.2194 26.0823 25.6101 26.4731C26.0008 26.8638 26.5307 27.0832 27.0833 27.0832H47.9166C48.4691 27.0832 48.999 26.8638 49.3897 26.4731C49.7804 26.0823 49.9999 25.5524 49.9999 24.9999ZM12.7083 44.0374L20.177 36.9249C20.3857 36.7391 20.5549 36.5132 20.6745 36.2607C20.7941 36.0082 20.8617 35.7342 20.8733 35.4551C20.8848 35.1759 20.8401 34.8972 20.7418 34.6357C20.6434 34.3742 20.4935 34.1351 20.3009 33.9327C20.1083 33.7303 19.8769 33.5687 19.6205 33.4575C19.3642 33.3464 19.0881 33.2879 18.8087 33.2856C18.5293 33.2833 18.2523 33.3373 17.9942 33.4443C17.736 33.5512 17.5021 33.709 17.3062 33.9082L9.80617 41.0562C9.60577 41.2578 9.36623 41.4162 9.10231 41.5217C8.83838 41.6273 8.55564 41.6777 8.2715 41.6699C7.98736 41.6621 7.70782 41.5962 7.45008 41.4764C7.19235 41.3565 6.96187 41.1851 6.77284 40.9728L3.47076 38.027C3.05801 37.659 2.51599 37.4701 1.96393 37.5017C1.41187 37.5333 0.894995 37.783 0.527007 38.1957C0.159019 38.6085 -0.0299353 39.1505 0.00171147 39.7026C0.0333582 40.2546 0.283014 40.7715 0.695757 41.1395L3.91242 44.002C5.07841 45.1683 6.65808 45.8264 8.30721 45.833C9.95634 45.8397 11.5413 45.1943 12.7166 44.0374H12.7083ZM49.9999 41.6666C49.9999 41.114 49.7804 40.5841 49.3897 40.1934C48.999 39.8027 48.4691 39.5832 47.9166 39.5832H27.0833C26.5307 39.5832 26.0008 39.8027 25.6101 40.1934C25.2194 40.5841 24.9999 41.114 24.9999 41.6666C24.9999 42.2191 25.2194 42.749 25.6101 43.1397C26.0008 43.5304 26.5307 43.7499 27.0833 43.7499H47.9166C48.4691 43.7499 48.999 43.5304 49.3897 43.1397C49.7804 42.749 49.9999 42.2191 49.9999 41.6666Z" fill="#D43F5D" />
            </g>
            <defs>
              <clipPath id="clip0_160_130">
                <rect width="50" height="50" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <h2 className="text-[36px] text-[#D43F5D]">Confirmar álbum</h2>
        </div>

        {/* Capa do álbum */}
        <div>
          <label className="text-[16px] text-[#888888] block mb-2">capa:</label>
          <div className="w-40 h-40">
            <img
              src={capaUrl}
              alt="Capa do álbum"
              className="w-[150px] h-[150px] object-cover rounded"
            />
          </div>
        </div>

        {/* Título */}
        <div>
          <LabelGenerico labelGenerico="título" id="titulo" />
          <InputGenerico
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        {/* Gênero */}
        <div>
          <LabelGenerico labelGenerico="gênero musical" id="genero" />
          <SelectGenerico
            id="genero"
            name="genero"
            value={genero}
            options={generoOptions}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>

        <div>
          <LinkedMusiciansList
            musicians={musicos.map((m) => ({
              id: m.id,
              nome_artistico: m.nome_artistico,
              foto_perfil: m.foto_perfil || '/src/assets/avatar-default.png',
            }))}
            onRemoveMusician={() => {}}
          />
        </div>

        {/* Músicas */}
        <div>
          <h3 className="text-[16px] text-[#888888] mb-2">músicas:</h3>
          <div className="space-y-2">
            {musicas.length > 0 ? (
              musicas.map((musica) => (
                <div
                  key={musica.id}
                  className="flex items-center gap-4 p-3 rounded-[5px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                >
                  <img
                    src={capaUrl}
                    alt={musica.titulo}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-[#888888] text-[13px]">{musica.titulo}</p>
                  </div>
                  <div className="flex gap-2">
                    {musica.audio && (
                      <button
                        type="button"
                        onClick={() => {
                          const audio = new Audio(musica.audio)
                          audio.play()
                        }}
                        className="p-2 hover:bg-rose-100 rounded transition"
                        title="Ouvir"
                      >
                        <img src="/icons/play.png" alt="Ouvir" className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#888888]">Nenhuma música adicionada</p>
            )}
          </div>
        </div>

        {resultado?.erro && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
            <strong>Erro:</strong> {resultado.erro}
          </div>
        )}

        {resultado?.sucesso && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
            <strong>Sucesso:</strong> {resultado.sucesso}
          </div>
        )}

        <div className="flex flex-row gap-[25px] self-end">
          <Button
            text="Voltar"
            variant="voltar"
            type="button"
            onClick={() => navigate(-1)}
          />
          <button
            type="submit"
            name="_action"
            value="update-album"
            className="px-6 py-2 bg-[#D43F5D] text-white rounded hover:bg-[#5C1B35] transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Atualizando..." : "Modificar álbum"}
          </button>
          <button
            type="submit"
            name="_action"
            value="create-album"
            className="px-6 py-2 bg-[#D43F5D] text-white rounded hover:bg-[#5C1B35] transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Criando..." : "Criar álbum"}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default ConfirmarAlbum