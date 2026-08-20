import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../useAdminAuth';

const Login = () => {
    const { login } = useAdminAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F] px-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-sm rounded-2xl border border-blue-500/20 bg-white/[0.03] backdrop-blur-md p-8"
            >
                <h1 className="text-2xl font-bold text-white mb-1 text-center">Admin Login</h1>
                <p className="text-sky-100/50 text-sm text-center mb-6">Portfolio content management</p>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-300 text-sm mb-4 text-center bg-red-500/10 border border-red-500/25 rounded-lg py-2"
                    >
                        {error}
                    </motion.p>
                )}

                <div className="mb-4">
                    <label className="text-xs text-sky-100/60 mb-1 flex items-center gap-1.5">
                        <Mail size={13} /> Email
                    </label>
                    <input
                        type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
                <div className="mb-6">
                    <label className="text-xs text-sky-100/60 mb-1 flex items-center gap-1.5">
                        <Lock size={13} /> Password
                    </label>
                    <input
                        type="password" required value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>

                <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-500 transition-colors disabled:opacity-60"
                >
                    {loading && <Loader2 size={15} className="animate-spin" />}
                    {loading ? 'Signing in...' : 'Sign In'}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default Login;
