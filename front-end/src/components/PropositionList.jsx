import styled from "styled-components";
import Proposition from "./Proposition";
import { useState } from "react";
import Select from 'react-select';

export default function PropositionList({ propositionList, loadPropositions }) {
    const [search, setSearch] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const propositionYears = [...new Set(propositionList.map((proposition) => proposition.name.split("/")[proposition.name.split("/").length - 1]))];
    const yearOptions = propositionYears.sort().map(year => { return { value: year, label: year } });

    const propositionTypes = [...new Set(propositionList.map((proposition) => proposition.name.split(" ")[0]))];
    const typeOptions = propositionTypes.sort().map(type => { return { value: type, label: type } });

    const searchLowerCase = search.toString().toLowerCase();

    const filteredPropositions = propositionList.filter((proposition) => (
        (
            proposition.name.toString().toLowerCase().includes(searchLowerCase)
            ||
            proposition.keyWords.some((keyWord) => keyWord.toString().toLowerCase().includes(searchLowerCase))
        ) && (!yearFilter || proposition.name.includes(yearFilter.value))
        && (!typeFilter || proposition.name.includes(typeFilter.value))
    ));

    return (
        <Main>
            <h1>Proposições Legislativas</h1>
            <Filter>
                <input type="search" value={search} placeholder="🔍 Pesquisar" onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <Select className="select" options={yearOptions} isClearable={true} isSearchable={true} onChange={(years) => setYearFilter(years)} placeholder="Ano" />
                    <Select className="select" options={typeOptions} isClearable={true} isSearchable={true} onChange={(types) => setTypeFilter(types)} placeholder="Tipo" />
                </div>
            </Filter>
            {filteredPropositions.length > 0 ? filteredPropositions.map(proposition => <Proposition id={proposition.id} name={proposition.name} url={proposition.url} keyWords={proposition.keyWords} loadPropositions={loadPropositions} propositionList={filteredPropositions} />) : <h2>Nenhuma proposição encontrada!</h2>}
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 100%;

    h1{
    font-weight: 700;
    font-size: 60px;
    color: #191970;
    margin-bottom:30px;
  }

  h2{
    margin-top: 10%;
    font-weight: 500;
    font-size: 35px;
    color: grey;
  }
`

const Filter = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
    align-items: center;

    >div{
        display: flex;
    }
    input{
        width: 70%;
        height: 50px;
        border-style: solid;
        border-width:2px;
        border-color: #191970;
        border-radius: 20px;
        padding: 12px;
        font-weight: 400;
        font-size:20px;
        color:#000000
    }

    input::placeholder{
        font-weight: 400;
        color:#000000
    }

    .select{
        margin-left:10px;
    }
`