import styled from 'styled-components';
import React from 'react';
import Top from '../components/Top';
import Bottom from '../components/Bottom';

export default function Historico(){
    return(
        <Holder>
            <Top/>
            <History><h1>Histórico</h1></History>
            <HabitsHistory><h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1></HabitsHistory>
            <Bottom/>
        </Holder>
    )
}

const Holder = styled.div`
    box-sizing:border-box;
    background-color:#e5e5e5;
    min-height:100vh;
    width:100%;
    padding-top:70px;
    padding-right:20px;
    padding-left:20px;
    padding-bottom:120px;
`;

const History = styled.div`
    box-sizing:border-box;
    margin-top:28px;
    h1{
        font-family: 'Lexend Deca';
        font-size:23px;
        color:#126ba5;
    }
`;

const HabitsHistory = styled.div`
    box-sizing: border-box;
    margin-top:17px;
    h1{
        font-family:'Lexend Deca';
        font-size:18px;
        color:#666666;
    }
`