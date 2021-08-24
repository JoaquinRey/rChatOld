import React from 'react';
import './loginPage.css';

export class LoginPage extends React.Component {
    state = {
        username: '',
        password: ''
    };

    render() {
        return(
            <div className="login-page">
                <input type="text" id="username" name="username"></input>
                <input type="text" id="password" name="password"></input>
            </div>
        )
    }
    
}