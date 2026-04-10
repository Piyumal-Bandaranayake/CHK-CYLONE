"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { supabase } from '@/lib/supabase';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if we have a session (Supabase automatically handles the recovery token in the URL)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Invalid or expired reset link. Please request a new one.');
            }
        };
        checkSession();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess('Password updated successfully! Redirecting to login...');
                setTimeout(() => {
                    supabase.auth.signOut();
                    router.push('/admin/login');
                }, 3000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const boxStyle = {
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
                <div style={boxStyle}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '2rem', color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)', marginBottom: '10px' }}>New Password</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Create a new secure password for your account.</p>
                    </div>

                    <form onSubmit={handleUpdatePassword}>
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
                            <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>New Password</label>
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

                        <div style={{ marginBottom: '5px' }}>
                            <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Confirm Password</label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                style={inputStyle} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                placeholder="••••••••" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '15px', top: '12px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
                            >
                                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--neon-yellow)', color: '#000', borderColor: 'var(--neon-yellow)', fontWeight: 'bold' }}>
                            {isLoading ? 'UPDATING...' : 'UPDATE PASSWORD'}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
