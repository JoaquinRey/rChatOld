import React from 'react';
import './loginPage.scss';
import { Link } from "react-router-dom";

export class LoginPage extends React.Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return(
            <div className="login">
                <h1>Login</h1>
                <div className="fields">
                    <input type="text" id="username" placeholder="username" name="username" required="required"></input>
                    <input type="text" id="password" placeholder="password" name="password" required="required"></input>
                    <button type="submit" className="submit-login">Let me in.</button> 
                </div>
                <div class="external-links">
                    <Link to="./app">Go to app</Link>
                    <Link to="./signup">Signup for an account</Link>
                </div>
            </div>
        )
    }
    
}