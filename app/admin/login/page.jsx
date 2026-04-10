"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    // Check if user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push('/admin');
            }
        };
        checkUser();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else if (data.session) {
                router.push('/admin');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess('Password reset email sent! Please check your inbox.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
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
                        <h2 style={{ fontSize: '2rem', color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)', marginBottom: '10px' }}>
                            {isResetMode ? 'Reset Password' : 'Admin Portal'}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            {isResetMode ? 'Enter your email to receive a reset link.' : 'Enter credentials to access the dashboard.'}
                        </p>
                    </div>

                    {isResetMode ? (
                        <form onSubmit={handleResetPassword}>
                            {error && (
                                <div style={{ padding: '10px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', color: 'red', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div style={{ padding: '10px', background: 'rgba(0, 255, 0, 0.1)', border: '1px solid var(--neon-yellow)', color: 'var(--neon-yellow)', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                    {success}
                                </div>
                            )}

                            <div style={{ marginBottom: '5px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
                            </div>
                            <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />

                            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--neon-yellow)', color: '#000', borderColor: 'var(--neon-yellow)', fontWeight: 'bold' }}>
                                {isLoading ? 'SENDING...' : 'SEND RESET LINK'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button type="button" onClick={() => setIsResetMode(false)} style={{ background: 'none', border: 'none', color: 'var(--neon-yellow)', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin}>
                            {error && (
                                <div style={{ padding: '10px', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', color: 'red', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div style={{ padding: '10px', background: 'rgba(0, 255, 0, 0.1)', border: '1px solid var(--neon-yellow)', color: 'var(--neon-yellow)', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                                    {success}
                                </div>
                            )}

                            <div style={{ marginBottom: '5px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Email Address</label>
                            </div>
                            <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />

                            <div style={{ marginBottom: '5px' }}>
                                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Password</label>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    style={inputStyle} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder="••••••••" 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '15px', top: '12px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>

                            <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--neon-yellow)', color: '#000', borderColor: 'var(--neon-yellow)', fontWeight: 'bold' }}>
                                {isLoading ? 'LOGGING IN...' : 'Log In'}
                            </button>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button type="button" onClick={() => setIsResetMode(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.8rem' }}>
                                    Forgot Password?
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
