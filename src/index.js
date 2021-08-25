import ReactDOM from 'react-dom';
import UserContext from './contexts/UserContext';
import ProgressWheelContext from './contexts/ProgressWheelContext';
import React from 'react';
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './routes/Login';
import Cadastro from './routes/Cadastro';
import Hoje from './routes/Hoje';
import Habitos from './routes/Habitos';
import Historico from './routes/Historico';


function App(){
    const [user, setUser] = React.useState(null);
    const [progressWheel, setProgressWheel] = React.useState(0);

    return(
        <UserContext.Provider value = {{user, setUser}}>
            <ProgressWheelContext.Provider value = {{progressWheel, setProgressWheel}}>
                <BrowserRouter>
                <GlobalStyles/>
                    <Switch>
                        <Route path="/" exact>
                            <Login/>
                        </Route>
                        <Route path="/cadastro" exact>
                            <Cadastro/>
                        </Route>
                        <Route path="/hoje" exact>
                            <Hoje/>
                        </Route>
                        <Route path="/habitos" exact>
                            <Habitos/>
                        </Route>
                        <Route path="/historico" exact>
                            <Historico/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ProgressWheelContext.Provider>
        </UserContext.Provider>
    )
}

ReactDOM.render(<App/>, document.querySelector(".root"));