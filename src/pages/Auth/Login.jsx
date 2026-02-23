import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('visitor');

    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        const role = activeTab === 'admin' ? 'admin' : selectedRole;

        try {
            login(role, email, password);
            navigate(role === 'visitor' ? '/' : `/${role}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    background: 'var(--color-white)',
                    padding: '4rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-md)'
                }}
            >
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Back</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                    Access your digital sanctuary.
                </p>

                {/* Tab Switcher */}
                <div style={{
                    display: 'flex',
                    marginBottom: '3rem',
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: '0.5rem'
                }}>
                    <button
                        onClick={() => { setActiveTab('user'); setError(''); }}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: activeTab === 'user' ? '600' : '400',
                            color: activeTab === 'user' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderBottom: activeTab === 'user' ? '2px solid var(--color-accent)' : 'none',
                            transition: 'var(--transition-smooth)'
                        }}
                    >
                        Collector / Artist
                    </button>
                    <button
                        onClick={() => { setActiveTab('admin'); setError(''); }}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: activeTab === 'admin' ? '600' : '400',
                            color: activeTab === 'admin' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderBottom: activeTab === 'admin' ? '2px solid var(--color-accent)' : 'none',
                            transition: 'var(--transition-smooth)'
                        }}
                    >
                        Staff Access
                    </button>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{
                            background: '#fff5f5',
                            color: '#c53030',
                            padding: '1rem',
                            borderRadius: '4px',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            border: '1px solid #feb2b2'
                        }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Email Address</label>
                        <input required type="email" placeholder="e.g. curator@artvista.art" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Password</label>
                        <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                    </div>

                    {activeTab === 'user' && (
                        <div>
                            <label style={labelStyle}>Your Role</label>
                            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} style={inputStyle}>
                                <option value="visitor">Visitor (Browse & Acquire)</option>
                                <option value="artist">Artist (Manage Collection)</option>
                                <option value="curator">Curator (Organize Exhibits)</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1.2rem' }}>
                        {activeTab === 'admin' ? 'Admin Login' : 'Enter Gallery'}
                    </button>
                </form>

                <p style={{ marginTop: '3rem', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--color-accent)', opacity: 0.7 }}>
                    {activeTab === 'admin'
                        ? "Governance requires vision."
                        : "Every artist was first an amateur."}
                </p>
            </motion.div>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.6rem',
    color: 'var(--color-text-muted)'
};

const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    background: '#fcfcfc'
};

export default Login;
