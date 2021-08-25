import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { App } from './chat/App';
import { LoginPage } from './login/LoginPage';
import { Signup } from './login/Signup';
import Enter from './login/Enter';

export default function Controller() {

    const [token, setToken] = useState();

    if(!token) {
        return <Enter setToken={setToken} />
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/'>
                        <App dataFromParent={token}/>
                    </Route>
                    <Route path="/app">
                        <App />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

