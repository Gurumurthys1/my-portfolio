import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/admin/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <section className="min-h-screen bg-gray-bg flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-dark border border-gray-border p-8 rounded-xl max-w-md w-full shadow-lg"
            >
                <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
                <p className="text-gray-light mb-8">Sign in to manage your portfolio content.</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-light text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none transition-colors"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-light text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-bg border border-gray-border text-white p-3 rounded focus:border-primary outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded font-medium hover:bg-primary/80 transition-colors"
                    >
                        Sign In
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full text-gray-light text-sm hover:text-white transition-colors"
                    >
                        Return to Website
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default Login;
