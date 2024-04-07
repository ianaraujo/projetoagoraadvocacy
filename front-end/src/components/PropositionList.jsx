import styled from "styled-components";
import Proposition from "./Proposition";

export default function PropositionList({ propositionList, loadPropositions }) {
    return (
        <Main>
            <h1>Proposições Legislativas</h1>
            {propositionList.map(proposition => <Proposition id={proposition.id} name={proposition.name} url={proposition.url} keyWords={proposition.keyWords} loadPropositions={loadPropositions} propositionList={propositionList} />)}
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 100%;
    background-color:white;

    >div{
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
        justify-content: space-between;
    }

    h1{
    font-weight: 700;
    font-size: 60px;
    color: #191970;
    margin-bottom:30px;
  }
`