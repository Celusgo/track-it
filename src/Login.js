import styled from 'styled-components';
import { useState } from 'react';
import LoginLogo from './logo.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Login(){
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const body = {
        email,
        password
    }

    function sendLogin(){
        const login = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body)
        login.then(()=>{history.push("/hoje")});

        login.catch((error)=>{history.push("/");
        if(error.response.status === 422){
            alert("Por favor, coloque um e-mail com formatação correta.")
        } else if (error.response.status === 401) {
            alert("Usuário e/ou senha inválidos!");
        } else{
            alert("Ocorreu um erro!");
        }});
        
    }

    return(
        <>
            <Container>
                <img src={LoginLogo} alt = "TrackIt"/>
            </Container>
            <Input type='text' placeholder="email" onChange={e => setEmail(e.target.value)}></Input>
            <Input type='password' placeholder="senha" onChange={e => setPassword(e.target.value)}></Input>
            <Button onClick={()=>sendLogin()}>Entrar</Button>
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