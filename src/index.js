import ReactDOM from 'react-dom';
import React from 'react';
import './css/reset.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';


function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="/cadastro" exact>
                    <Cadastro/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App/>, document.querySelector(".root"));