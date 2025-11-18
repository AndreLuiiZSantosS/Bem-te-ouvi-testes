import { useState, type ChangeEvent } from "react";
import InputDateTime from "../components/anunciarEvento/InputDateTime";
import Button from "../components/Button";
import InputGenerico from "../components/genericos/InputGenerico";
import LabelGenerico from "../components/genericos/LabelGenerico";
import TextAreaGenerico from "../components/genericos/TextAreaGenerico";
import ImageUpload from "../components/ImageUpload";
import Title from "../components/Title";

export default function AnunciarEvento() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [data, setData] = useState("");
    const [local, setLocal] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);

    const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value);
    const handleDescricaoChange = (e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value);
    const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => setData(e.target.value);
    const handleLocalChange = (e: ChangeEvent<HTMLInputElement>) => setLocal(e.target.value);
    const handleImageChange = (file: File | null) => setImagem(file);

    const handleSubmit = async () => {
        if (!nome || !descricao || !data || !local || !imagem) {
            alert("Por favor, preencha todos os campos e adicione uma imagem.");
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("descricao", descricao);
        formData.append("data_do_evento", new Date(data).toISOString());
        formData.append("endereco", local);
        formData.append("imagem_do_evento", imagem);
        formData.append("musico", "1"); // ID fixo para exemplo, precisa implementar autenticação primeiro

        try {
            const response = await fetch("http://localhost:8000/bemteouvi_api/eventos/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                // clone da resposta para poder ler em dois formatos
                const responseClone = response.clone();
                let errorMessage = "";

                try {
                    const errorData = await response.json();
                    console.error("Erro JSON:", errorData);
                    errorMessage = JSON.stringify(errorData, null, 2);
                } catch {
                    const errorText = await responseClone.text();
                    console.error("Erro texto:", errorText);
                    errorMessage = errorText.slice(0, 300) + "...";
                }

                alert("Erro ao cadastrar evento:\n" + errorMessage);
                return;
            }

            alert("Evento cadastrado com sucesso!");
            setNome("");
            setDescricao("");
            setData("");
            setLocal("");
            setImagem(null);
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Não foi possível conectar ao servidor.");
        }
    };


    return (
        <div className="flex flex-col gap-[35px] ml-[286px] mb-[170px]">
            <div className="flex flex-row gap-[16px] items-center">
                <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#D43F5D]"
                >
                    <path d="M16.6667 25H12.5C10.2021 25 8.33333 26.8687 8.33333 29.1667V33.3333C8.33333 35.6312 10.2021 37.5 12.5 37.5H16.6667C18.9646 37.5 20.8333 35.6312 20.8333 33.3333V29.1667C20.8333 26.8687 18.9646 25 16.6667 25ZM12.5 33.3333V29.1667H16.6667V33.3333H12.5ZM39.5833 4.16667H37.5V2.08333C37.5 0.933333 36.5687 0 35.4167 0C34.2646 0 33.3333 0.933333 33.3333 2.08333V4.16667H16.6667V2.08333C16.6667 0.933333 15.7354 0 14.5833 0C13.4312 0 12.5 0.933333 12.5 2.08333V4.16667H10.4167C4.67292 4.16667 0 8.83958 0 14.5833V39.5833C0 45.3271 4.67292 50 10.4167 50H39.5833C45.3271 50 50 45.3271 50 39.5833V14.5833C50 8.83958 45.3271 4.16667 39.5833 4.16667ZM10.4167 8.33333H39.5833C43.0292 8.33333 45.8333 11.1375 45.8333 14.5833V16.6667H4.16667V14.5833C4.16667 11.1375 6.97083 8.33333 10.4167 8.33333ZM39.5833 45.8333H10.4167C6.97083 45.8333 4.16667 43.0292 4.16667 39.5833V20.8333H45.8333V39.5833C45.8333 43.0292 43.0292 45.8333 39.5833 45.8333Z" />
                </svg>
                <Title text="Anunciar Evento" size="lg" />
            </div>

            <div>
                <LabelGenerico labelGenerico="imagem do evento" />
                <ImageUpload onImageChange={handleImageChange} />
            </div>

            <div>
                <LabelGenerico labelGenerico="nome do evento" id="nome" />
                <InputGenerico id="nome" value={nome} onChange={handleNomeChange} disableInput={false} />
            </div>

            <div>
                <LabelGenerico labelGenerico="descrição do evento" id="descricao" />
                <TextAreaGenerico id="descricao" value={descricao} onChange={handleDescricaoChange} />
            </div>

            <div>
                <LabelGenerico labelGenerico="data do evento" id="data" />
                <InputDateTime id="data" value={data} onChange={handleDataChange} />
            </div>

            <div>
                <LabelGenerico labelGenerico="local do evento" id="local" />
                <InputGenerico id="local" value={local} onChange={handleLocalChange} disableInput={false} />
            </div>

            <div className="self-end">
                <Button text="Anunciar Evento" variant="confirmar" onClick={handleSubmit} />
            </div>
        </div>
    );
}
