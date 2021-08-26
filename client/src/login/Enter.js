import React, { useState } from 'react';
import './loginPage.scss';
import { Link } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LoginPage } from './LoginPage';

async function loginUser(credentials) {
    return fetch('http://192.168.1.67:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Enter({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== "bingus") {
            return;
        }
        const token = await loginUser({
            username,
            password
        });
        setToken({user: username})
        console.log("submit");
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="fields">
                <input type="text" id="username" placeholder="username" name="username" required="required" onChange={e => setUserName(e.target.value)}></input>
                <input type="password" id="password" placeholder="password" name="password" required="required" onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" className="submit-login" onClick={handleSubmit}>Let me in.</button> 
            </form>
        </div>
        
    );
}

Enter.propTypes = {
    setToken: PropTypes.func.isRequired
}