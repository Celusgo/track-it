import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';

export default function Hoje(){
    const {user} = useContext(UserContext);

    return(
        <Holder>
            <Header>
             <h1>TrackIt</h1>
             <img src={user.image} alt="user"/>
            </Header>
             ITENS AQUI
            <Footer>
                <h1>Hábitos</h1>
                <h1>Histórico</h1>
            </Footer>
        </Holder>
    )
}

const Holder = styled.div`
    box-sizing: border-box;
    background-color:#e5e5e5;
    height:100%;
    width:100%;
    margin-top:70px;
`;
const Header = styled.div`
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content: space-between;
    width:100%;
    height:70px;
    background-color:#126ba5;
    position:fixed;
    top:0;
    left:0;
    padding:0px 18px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1{
        font-family: 'Playball';
        font-weight: 400;
        font-size:39px;
        color:#FFFFFF;
    }

    img{
        width:51px;
        height:51px;
        border-radius:98.5px;
    }

`;

const Footer = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 100%;
    background-color:#FFFFFF;
    position:fixed;
    bottom:0;
    left:0;

    h1{
        font-family: 'Lexend Deca';
        font-size:22px;
        color:#52b6ff
    }
`