import React from 'react';
import {useState} from "react";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import api from '../api';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await api.post('/auth/login', {username, password});
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Login failed');
        }
    };

    return (
        <div className="bg-cover-page">
            <div className="form-container">
                <h1 className="title">Login / Register</h1>

                <label className="form-label">Username</label>
                <input
                    name="username"
                    placeholder="Email"
                    onChange={e => setUsername(e.target.value)}
                    className="input-field"
                />

                <label className="form-label">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="input-field"
                />

                <button onClick={handleLogin} className="form-button button">
                    Login
                </button>

                <p className="login-footer">
                    Don't have an account?{' '}
                    <Link to="/register" className="register-link">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
