"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simple hardcoded login for now - in a real app, you should check this against a database or environment variable.
        // For this task, I'll use a placeholder check that can be replaced.
        if (username === 'admin' && password === 'admin123') {
            // In a more robust version, we'd use cookies or local storage with a proper token.
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin_auth', 'true');
                router.push('/admin');
            }
        } else {
            setError('Invalid username or password');
        }
    };

    const loginBoxStyle = {
        background: '#0a0a0a',
        padding: '50px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '400px',
        marginTop: '60px'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        marginBottom: '20px',
        fontSize: '1rem',
        outline: 'none'
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '120px 20px' }}>
                <div style={loginBoxStyle}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)', marginBottom: '10px' }}>Admin Portal</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Enter credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {error && (
                            <div style={{ 
                                padding: '10px', 
                                background: 'rgba(255, 0, 0, 0.1)', 
                                border: '1px solid red', 
                                color: 'red', 
                                borderRadius: '8px', 
                                marginBottom: '20px', 
                                textAlign: 'center',
                                fontSize: '0.9rem'
                            }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
                                {error}
                            </div>
                        )}

                        <div style={{ marginBottom: '5px' }}>
                            <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Username</label>
                        </div>
                        <input 
                            type="text" 
                            style={inputStyle} 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="username"
                        />

                        <div style={{ marginBottom: '5px' }}>
                            <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Password</label>
                        </div>
                        <input 
                            type="password" 
                            style={inputStyle} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="••••••••"
                        />

                        <button 
                            type="submit" 
                            className="btn btn-primary" 
                            style={{ 
                                width: '100%', 
                                marginTop: '10px', 
                                background: 'var(--neon-yellow)', 
                                color: '#000', 
                                borderColor: 'var(--neon-yellow)',
                                fontWeight: 'bold'
                            }}
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
