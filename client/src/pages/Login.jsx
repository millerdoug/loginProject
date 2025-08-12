import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import api from '../api';
import {login} from "../slices/authSlice";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        try {
            const res = await api.post('/auth/login', {username, password});

            if (res.status === 200) {
                dispatch(login({role: res.data.role}));
                navigate("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error(err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center text-primary mb-6">
                    Login / Register
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
                        {error}
                    </div>
                )}

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                </label>
                <input
                    name="username"
                    placeholder="Email"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-primary-dark transition"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-primary hover:text-primary-dark font-medium"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
