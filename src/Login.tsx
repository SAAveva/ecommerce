import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signin = (e: any) => {
        e.preventDefault();

        fetch('http://localhost:5000/signin', {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('auth', response.auth_key);
            window.location.href = '/shop';
        })
        
    }
    return (
        <div className="signin">
            <h1>Signin</h1>
            <form>
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-field">
                    <button onClick={signin}>Login</button>
                </div>
            </form>
        </div>
    )
}

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const signup = (e: any) => {
        e.preventDefault();
        fetch('http://localhost:5000/signup', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        })
        .then((response) => {
            if (response.ok) {
                console.log('its ok')
                setError('');
                window.location.href = '/signin';
            }
            else
                setError("Error in one of the fields");

        });
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form>
                {error ? <p>{error}</p>:''}
                <div className="form-field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-field">
                    <button onClick={signup}>Signup</button>
                </div>
            </form>
        </div>
    )
}

export {
    Signup,
    Signin
}