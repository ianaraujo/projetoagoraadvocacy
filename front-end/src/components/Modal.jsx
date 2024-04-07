import styled from "styled-components";

export default function Modal({ isOpen, setModalOpen, children }) {
    if (isOpen) {
        return (
            <>
                <Background onClick={() => setModalOpen()} />
                <Main>
                    {children}
                </Main>
            </>
        )
    } else {
        return null
    }

}
const Main = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 50px;
    background-color: #fff;
    width:550px;
    border-radius: 10px;
    color: black;
    z-index: 2;
    font-size:20px;

    >h2{
        font-weight: 700;
        font-size: 25px;
        color: #191970;
    }
`
const Background = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0,0,0, 0.7);
    z-index: 1;
`