import React from 'react';
import {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import api from "../api";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenter, setReenter] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (reenter !== password) {
            alert("Passwords don't match");
            return;
        }

        const res = await api.post('/auth/register', {username, password});

        if (res.ok) {
            alert('Registered successfully');
            navigate('/login');
        } else {
            alert('Register failed');
        }
    };

    return (
        <div className="bg-cover-page">
            <div className="form-container">
                <h1 className="form-title">Register</h1>
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

                <label className="form-label">Reenter Password</label>
                <input
                    name="reenter"
                    type="password"
                    placeholder="Reenter Password"
                    onChange={e => setPassword(e.target.value)}
                    className="input-field"
                />

                <label className="form-label">Role Requested</label>
                <input
                    name="role"
                    placeholder="admin"
                    onChange={e => setPassword(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleRegister} className="form-button button">
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;
