import styled from 'styled-components';
import React, {useContext} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressWheelContext from '../contexts/ProgressWheelContext';
import { Link } from 'react-router-dom';

export default function Bottom(){
    const { progressWheel } = useContext(ProgressWheelContext);

    return(
     <Footer>
        <Link to="/habitos"><h1>Hábitos</h1></Link>
            <ProgressHolder>
                <Link to="/hoje"><CircularProgressbar
                background = {true}
                value={isNaN(progressWheel)? 0: progressWheel*100}
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
    )
};

const Footer = styled.div`
    box-sizing: border-box;
    display:flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width:100%;
    background-color:#FFFFFF;
    position:fixed;
    z-index:1;
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