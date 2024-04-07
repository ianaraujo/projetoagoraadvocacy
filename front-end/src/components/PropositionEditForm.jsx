import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Puff } from "react-loader-spinner"

export default function PropositionEditForm({ id, name, url, keyWords, loadPropositions, setModalOpen }) {
    const [propositionInfo, setPropositionInfo] = useState({ name: name, url: url, keyWords: keyWords });
    const [disable, setDisable] = useState(false);

    function submitData(event) {
        event.preventDefault();
        setDisable(true);
        const promise = axios.put(`http://127.0.0.1:8000/propositions/${id}`, propositionInfo);

        promise.then(() => {
            loadPropositions();
            setDisable(false);
            setModalOpen()
        })

        promise.catch(() => {
            setDisable(false)
            alert("Informações invalidas");
            setModalOpen()
        });

    }

    return (
        <Main onSubmit={submitData}>
            <input
                maxLength={26}
                type="text"
                id="name"
                value={propositionInfo.name}
                required
                onChange={(e) => setPropositionInfo({ ...propositionInfo, name: e.target.value })}
                placeholder="Nome"
                disabled={disable} />

            <input
                maxLength={200}
                type="url"
                id="url"
                value={propositionInfo.url}
                required
                onChange={(e) => setPropositionInfo({ ...propositionInfo, url: e.target.value })}
                placeholder="URL"
                disabled={disable} />

            <input
                type="text"
                id="keyWords"
                value={propositionInfo.keyWords}
                onChange={(e) => setPropositionInfo({ ...propositionInfo, keyWords: e.target.value.split("; ") })}
                placeholder="Palavra-chave1; Palavra-chave2; Palavra-chave3; etc."
                disabled={disable} />

            <ChoiceEdit>
                <button type="submit" disabled={disable}>{disable ? <Puff color="#FFFFFF" width={40} height={40} /> : "Editar"}</button>
                <button>Cancelar</button>
            </ChoiceEdit>
        </Main>
    )
}

const Main = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    font-size: 30px;

    input{
        width: 85%;
        height: 50px;
        border-style: solid;
        border-width:2px;
        border-color: #191970;
        border-radius: 5px;
        margin-bottom: 13px;
        padding: 12px;
        font-weight: 400;
        color:#000000
    }

    input::placeholder{
        font-weight: 400;
        color:#000000
    }
`

const ChoiceEdit = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width:100%;
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
        background-color: orange;
        color: white;
        border: hidden;
    }

`