import axios from "axios";
import styled from "styled-components";
import PropositionAddForm from "./components/PropositionAddForm";
import PropositionList from "./components/PropositionList";
import { useState, useEffect } from "react";


export default function App() {
  const [propositions, setPropositions] = useState([])

  function loadPropositions() {
    const promise = axios.get("http://127.0.0.1:8000/propositions/");
    promise.then((response) => {
      response.data.map(proposition => (proposition.keyWords = JSON.parse(proposition.keyWords)))
      setPropositions(response.data);
    });
  }

  useEffect(() => { loadPropositions() }, []);

  return (
    <Main>
      <SideBar>
        <h1>Adicionar Proposição</h1>
        <PropositionAddForm propositionList={propositions} loadPropositions={loadPropositions} />
      </SideBar>
      <MainSection>
        <PropositionList propositionList={propositions} loadPropositions={loadPropositions} />
      </MainSection>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: space-between;

  >div{
    padding-top: 30px;
  }

`
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 33%;
  height: 100vh;
  background-color:#191970;
  position: fixed;
  top: 0;
  left: 0;

  h1{
    font-weight: 700;
    font-size: 30px;
    color: white;
  }
`
const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  background-color:white;
  width: 100%;
  padding-left:34%;
`
