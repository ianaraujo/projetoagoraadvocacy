import { IoTrash } from "react-icons/io5";
import { FaGear } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export default function Proposition({ id, name, url, keyWords, loadPropositions }) {
    const [itsOpen, setItsOpen] = useState(false);
    const [about, setAbout] = useState("");

    function deleteProposition() {
        const promise = axios.delete(`http://127.0.0.1:8000/propositions/${id}`);

        promise.then(() => {
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
            setAbout(response.data.dados[0].ementa)
        }
    }

    return (
        <Main onClick={() => toogleContent()}>
            <PropositionHeader>
                <h2>{name}</h2>
                <div>
                    <FaGear color="orange" fontSize="20px" />
                    <IoTrash color="red" fontSize="20px" cursor="pointer" onClick={() => deleteProposition()} />
                </div>
            </PropositionHeader>
            {itsOpen ?
                <PropositionBody>
                    {about}
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
    h2{
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
`