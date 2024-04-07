import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Puff } from "react-loader-spinner"

export default function PropositionForm({ loadPropositions, propositionList }) {
    const [propositionInfo, setPropositionInfo] = useState({ name: '', url: '', keyWords: '' });
    const [disable, setDisable] = useState(false);

    function isValid(name, url) {
        return !propositionList.some(proposition => proposition.name === name || proposition.url === url);
    }

    function submitData(event) {
        event.preventDefault();
        setDisable(true);
        if (isValid(propositionInfo.name, propositionInfo.url)) {
            const promise = axios.post("http://127.0.0.1:8000/propositions/", propositionInfo);

            promise.then(() => {
                loadPropositions();
                setDisable(false);
                setPropositionInfo({ name: '', url: '', keyWords: '' });
            })

            promise.catch(() => {
                setDisable(false)
                setPropositionInfo({ name: '', url: '', keyWords: '' });
                alert("Informações invalidas");
            });

        } else {
            setDisable(false);
            setPropositionInfo({ name: '', url: '', keyWords: '' });
            alert("Nome ou URL já existem na lista!");
        }
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
                onChange={(e) => setPropositionInfo({ ...propositionInfo, keyWords: e.target.value.split(";") })}
                placeholder="Palavra-chave1; Palavra-chave2; Palavra-chave3; etc."
                disabled={disable} />

            <button type="submit" disabled={disable}>{disable ? <Puff color="#FFFFFF" width={40} height={40} /> : "Cadastrar"}</button>
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
        border: hidden;
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

    button{
        background-color: #066e29;
        border-radius: 5px;
        border: hidden;
        width: 85%;
        height: 45px;
        font-weight: 700;
        color: #FFFFFF;
        display: flex;
        align-items:center;
        justify-content: center;
        cursor: pointer;
    }
`