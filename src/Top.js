import styled from 'styled-components';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';

export default function Top(){
    const {user} = useContext(UserContext);
    return(
        <Header>
        <h1>TrackIt</h1>
        <img src={user.image} alt="user"/>
       </Header>
    )
}

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

