import { Redirect, FormHolder, Button, Input, Container } from '../styles/SignStyles';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Logo from '../assets/logo.png';


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


    function sendLogin(e){
        e.preventDefault();
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
                <img src={Logo} alt = "TrackIt"/>
                <FormHolder onSubmit={sendLogin}>
                    <Input type='text' placeholder="email" value = {email} onChange={e => setEmail(e.target.value)} disabled = {isEnabled} ></Input>
                    <Input type='password' placeholder="senha" value = {password} onChange={e => setPassword(e.target.value)} disabled = {isEnabled}></Input>
                    <Button type="submit" opacityWhenDisabled = {isEnabled}>{isEnabled?<Loader type="ThreeDots" color="#FFFFFF" height={80} width={80}/>:"Entrar"}</Button>
                    <Redirect><Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link></Redirect>
                </FormHolder>
            </Container>
        </>
    )
};