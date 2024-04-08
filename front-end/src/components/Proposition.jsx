import { IoTrash } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import PropositionEditForm from "./PropositionEditForm";

export default function Proposition({ id, name, url, keyWords, loadPropositions }) {
    const [manageModal, setManageModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [itsOpen, setItsOpen] = useState(false);
    const [about, setAbout] = useState("Nenhuma informação adicional encontrada!");

    function deleteProposition() {
        const promise = axios.delete(`http://127.0.0.1:8000/propositions/${id}`);

        promise.then(() => {
            setDeleteModal(!deleteModal)
            loadPropositions();
        })
    }

    async function toogleContent() {
        if (!itsOpen && !about) {
            await getAbout();
            setItsOpen(true);
        } else if (!itsOpen) {
            setItsOpen(true);
        } else {
            setItsOpen(false);
        }
    }

    async function getAbout() {
        const regex = /^([A-Z]+)\s+(\d+)\/(\d{4})$/;
        const match = name.match(regex);

        if (match) {
            const type = match[1];
            const number = match[2];
            const year = match[3];

            const response = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/proposicoes?siglaTipo=${type}&numero=${number}&ano=${year}&ordem=ASC&ordenarPor=id`);

            if (response.data.dados.length > 0) {
                setAbout(`Ementa: ${response.data.dados[0].ementa}`)
            }
        }
    }

    return (
        <Main >
            <PropositionHeader>
                <button onClick={() => toogleContent()} cursor="pointer">{name}</button>
                <div>
                    <FaGear color="orange" fontSize="20px" cursor="pointer" onClick={() => setManageModal(true)} />
                    <Modal isOpen={manageModal} setModalOpen={setManageModal}>
                        <h2>Editar Proposição</h2>
                        <PropositionEditForm id={id} name={name} url={url} keyWords={keyWords} loadPropositions={loadPropositions} setModalOpen={setManageModal} manageModal={manageModal} />
                    </Modal>
                    <IoTrash color="red" fontSize="20px" cursor="pointer" onClick={() => setDeleteModal(true)} />
                    <Modal isOpen={deleteModal} setModalOpen={setDeleteModal}>
                        <h2>Deletar Proposição</h2>
                        {`Você tem certeza que deseja deletar os dados da ${name}?`}
                        <ChoiceDelete>
                            <button onClick={() => deleteProposition()}>Deletar</button>
                            <button onClick={() => setDeleteModal(!deleteModal)}>Cancelar</button>
                        </ChoiceDelete>
                    </Modal>
                </div>
            </PropositionHeader>
            {itsOpen ?
                <PropositionBody>
                    {about}
                    <span>{`Palavras-chave: ${keyWords}`}</span>
                    <a href={url} target="_blank" rel="noreferrer">Saiba Mais</a>
                </PropositionBody> : <></>}
        </Main>
    )
}

const Main = styled.div`
    width: 80%;
    min-height: 50px;
    margin-bottom: 13px;
    padding: 12px;
    border-radius:5px;
    border-style: solid;
    border-width:2px;
    border-color: #191970;
    font-weight: 400;
    color:#000000;
    display: flex;
    flex-direction: column;
`

const PropositionHeader = styled.div`
    width:100%;
    display: flex;
    justify-content: space-between;

    >div{
        width: 60px;
        display: flex;
        justify-content: space-between;
    }

    >button{
        cursor: pointer;
        background-color:white;
        border: none;
        font-weight: 700;
        font-size: 20px;
        color: #191970;
    }
`

const PropositionBody = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    text-align: justify;
    justify-content: space-between;
    margin-top:10px;

    a{
        text-decoration: underline;
        color:#191970;
        margin-top:10px;
    }

    span{
        margin-top:10px;
        font-size:13px;
        color:#cccccc;
    }
`

const ChoiceDelete = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    button{
        width: 40%;
        height: 45px;
        font-weight: 700;
        display: flex;
        align-items:center;
        justify-content: center;
        cursor: pointer;
        border-style: solid;
        border-width:2px;
        border-color: #191970;
        border-radius: 5px;
        color: #191970;
    }
    :first-child{
        background-color: red;
        color: white;
        border: hidden;
    }

`