import { useState } from 'react';
import styled from 'styled-components';
import LoginRegister from './logo.png';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-loader-spinner";

export default function Cadastro(){
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [isEnabled, setIsEnabled] = useState(false);

   const body = {
       email,
       name,
       image: picture,
       password
   }

   function sendData(){
       setIsEnabled(true);
       const send = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);
       send.then(()=>{history.push("/"); alert("Conta criada com sucesso!")});
       send.catch(()=>{history.push("/cadastro"); setIsEnabled(false); setName(""); setPassword(""); setPicture(""); setEmail(""); alert("Uma ou mais informações estão incorretas. Por favor, preencha novamente")});
   }

    return(
        <>
            <Container>
                    <img src={LoginRegister} alt = "TrackIt"/>
            </Container>
            <Input type='text' placeholder="email" value = {email} onChange={e => setEmail(e.target.value)} disabled={isEnabled}></Input>
            <Input type='password' placeholder="senha" value = {password} onChange={e => setPassword(e.target.value)} disabled={isEnabled}></Input>
            <Input type='text' placeholder="nome" value = {name} onChange={e => setName(e.target.value)} disabled={isEnabled}></Input>
            <Input type='text' placeholder="foto" value = {picture} onChange={e => setPicture(e.target.value)} disabled={isEnabled}></Input>
            <Button onClick={()=>sendData()} opacity = {isEnabled}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={80} width={80}/>:"Cadastrar"}</Button>
            <Login><Link to="/"><p>Não tem uma conta? Cadestre-se!</p></Link></Login>
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
const Login = styled.div`
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