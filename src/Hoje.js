import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

export default function Hoje(){
    const {user} = useContext(UserContext);
    const percentage = 85;

    return(
        <Holder>
            <Header>
             <h1>TrackIt</h1>
             <img src={user.image} alt="user"/>
            </Header>
             ITENS AQUI
            <Footer>
                <Link to="/habitos"><h1>Hábitos</h1></Link>
                <ProgressHolder>
                    <Link to="/hoje"><CircularProgressbar
                    background = {true}
                    value={percentage}
                    backgroundPadding={6}
                    text={`Hoje`}
                    styles={buildStyles({
                        pathColor: `#ffffff`,
                        textColor: '#ffffff',
                        trailColor: '#52b6ff',
                        backgroundColor: '#52B6FF',
                    })}
                    /></Link>
                </ProgressHolder>
                <Link to="/historico"><h1>Histórico</h1></Link>
            </Footer>
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
    box-sizing: border-box;
    display:flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width:100%;
    background-color:#FFFFFF;
    position:fixed;
    bottom:0;
    left:0;
    padding:0px 36px;

    h1{
        font-family: 'Lexend Deca';
        font-size:18px;
        color:#52b6ff
    }
`;

const ProgressHolder = styled.div`
    height:91px;
    width:91px;
    margin-bottom:45px;
`;

