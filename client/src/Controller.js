import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { App } from './chat/App';
import { LoginPage } from './login/LoginPage';
import { Signup } from './login/Signup';

export default function Controller() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/'>
                        <LoginPage />
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