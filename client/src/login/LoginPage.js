import React from 'react';
import './loginPage.scss';
import { Link } from "react-router-dom";

export class LoginPage extends React.Component {

    data = {
        channels: null,
        sockets: null,
        channel: null,
        user_id: null,
        username: 'rBad'
    };

    state = {
        username: null,
        password: null
    };

    render() {
        return(
            <div className="login">
                <h1>Login</h1>
                <div className="fields">
                    <input type="text" id="username" placeholder="username" name="username" required="required"></input>
                    <input type="text" id="password" placeholder="password" name="password" required="required"></input>
                    <button type="submit" className="submit-login" onClick={this.handleSubmit}>Let me in.</button> 
                </div>
                <div className="external-links">
                    <Link 
                    to={{
                        pathname: "./app",
                        state: [{channels: null, sockets: null, channel: null, user_id: null, username: "rBad"}]
                    }}>Go to app</Link>
                    <Link to="./signup">Signup for an account</Link>
                </div>
            </div>
        )
    }
    
}
