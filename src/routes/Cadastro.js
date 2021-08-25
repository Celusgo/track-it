import { useState } from 'react';
import { Redirect, FormHolder, Button, Input, Container } from '../styles/SignStyles';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Logo from '../assets/logo.png';

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

   function sendData(e){
       e.preventDefault();
       setIsEnabled(true);
       const send = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);
       send.then(()=>{history.push("/"); alert("Conta criada com sucesso!")});
       send.catch(()=>{history.push("/cadastro"); setIsEnabled(false); setName(""); setPassword(""); setPicture(""); setEmail(""); alert("Uma ou mais informações estão incorretas. Por favor, preencha novamente")});
   }

    return(
        <>
            <Container>
                <img src={Logo} alt = "TrackIt"/>
                <FormHolder onSubmit={sendData}>
                    <Input type='text' placeholder="email" value = {email} onChange={e => setEmail(e.target.value)} disabled={isEnabled}></Input>
                    <Input type='password' placeholder="senha" value = {password} onChange={e => setPassword(e.target.value)} disabled={isEnabled}></Input>
                    <Input type='text' placeholder="nome" value = {name} onChange={e => setName(e.target.value)} disabled={isEnabled}></Input>
                    <Input type='text' placeholder="foto" value = {picture} onChange={e => setPicture(e.target.value)} disabled={isEnabled}></Input>
                    <Button type="submit" opacityWhenDisabled = {isEnabled}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={80} width={80}/>:"Cadastrar"}</Button>
                    <Redirect><Link to="/"><p>Já tem uma conta? Faça login!</p></Link></Redirect>
                </FormHolder>
            </Container>
        </>
    )
};