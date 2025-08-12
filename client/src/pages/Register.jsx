import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from "../api";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenter, setReenter] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username || !password || !reenter || !role) {
            setError("Please fill out all fields.");
            return;
        }
        if (reenter !== password) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const res = await api.post('/auth/register', {username, password, role});

            if (res.status === 201) {
                alert('Registered successfully');
                navigate('/login');
            } else {
                setError('Registration failed.');
            }
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center text-primary mb-6">
                    Register
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
                    className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reenter Password
                </label>
                <input
                    name="reenter"
                    type="password"
                    placeholder="Reenter Password"
                    value={reenter}
                    onChange={e => setReenter(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Role:
                </label>
                <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                </select>

                <button
                    onClick={handleRegister}
                    className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-primary-dark transition"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-primary hover:text-primary-dark font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
