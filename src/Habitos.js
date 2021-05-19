import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import Top from './Top';
import Bottom from './Bottom';

export default function Habitos(){
    const {user} = useContext(UserContext);

    return(
        <Holder>
            <Top/>
            <HabitsInformation>
                <h1>Meus hábitos</h1>
                <Button>+</Button>
            </HabitsInformation>
            <Bottom/>
        </Holder>
    )
}

const Holder = styled.div`
    box-sizing:border-box;
    background-color:#e5e5e5;
    height:100vh;
    width:100%;
    padding-top:70px;
`;




const HabitsInformation = styled.div`
    box-sizing: border-box;
    width:100%;
    margin-top:22px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding:0px 17px;

    h1{
        font-family:'Lexend Deca';
        font-size:23px;
        color:#126BA5;
    }
`;

const Button = styled.button`
    display:flex;
    width: 40px;
    height: 35px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    border:none;
    outline:none;
    color:#FFFFFF;
    font-size:27px;
    font-family:'Lexend Deca';
    justify-content: center;
    align-items: center;
`;
