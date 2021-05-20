import styled from 'styled-components';
import { useState } from 'react';
import React, { useContext } from 'react';
import UserContext from './contexts/UserContext';
import LoginLogo from './logo.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-loader-spinner";

export default function Login(){
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);
    const {setUser} = useContext(UserContext);

    const body = {
        email,
        password
    }


    function sendLogin(){
        setIsEnabled(true);
        const login = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body)
        login.then((resposta)=>{
            setUser({id: resposta.data.id, name: resposta.data.name, token: resposta.data.token, image: resposta.data.image})
            history.push("/hoje")
        });

        login.catch((error)=>{history.push("/");
        if(error.response.status === 422){
            alert("Por favor, coloque um e-mail com formatação correta.")
            setIsEnabled(false);
            setPassword("");
            setEmail("");
        } else if (error.response.status === 401) {
            alert("Usuário e/ou senha inválidos!");
            setIsEnabled(false);
            setPassword("");
            setEmail("");
        } else{
            alert("Ocorreu um erro!");
            setIsEnabled(false);
            setPassword("");
            setEmail("");
        }});

    }

    return(
        <>
            <Container>
                <img src={LoginLogo} alt = "TrackIt"/>
            </Container>
            <Input type='text' placeholder="email" value = {email} onChange={e => setEmail(e.target.value)} disabled = {isEnabled} ></Input>
            <Input type='password' placeholder="senha" value = {password} onChange={e => setPassword(e.target.value)} disabled = {isEnabled}></Input>
            <Button opacity = {isEnabled} onClick={()=>sendLogin()}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={80} width={80}/>:"Entrar"}</Button>
            <Create><Link to="/cadastro"><p>Não tem uma conta? Cadestre-se!</p></Link></Create>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    margin-top:68px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:33px;

    img{
        width:180px;
        height:180px;
    }
`;

const Input = styled.input`
    font-family:'Lexend Deca';
    box-sizing:border-box;
    font-weight:400;
    font-size:20px;
    border-radius:5px;
    height:45px;
    width:303px;
    padding-left:11px;
    border: 1px solid #d5d5d5;
    margin-left:36px;
    margin-left:36px;
    margin-bottom:6px;
    outline: none;

    ::-webkit-input-placeholder  { 
        color: #DBDBDB;
    }
`;

const Button = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    color:#FFFFFF;
    font-family:'Lexend Deca';
    font-size:21px;
    box-sizing:border-box;
    font-weight:400;
    background-color:#52b6ff;
    border-radius:4.63636px;
    height:45px;
    width:303px;
    margin-left:36px;
    border:none;
    outline:none;
    opacity: ${props => props.opacity? "0.7": "1"};
`
const Create = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:17px;
    margin-top:25px;

    p{
        font-family:'Lexend Deca';
        font-weight:400;
        font-size:14px;
        color:#52b6ff;
        text-decoration-line:underline;
    }
`;