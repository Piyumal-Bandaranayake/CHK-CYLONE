"use client";

import React, { useState, useEffect } from 'react';

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Reduced to 2.5s for snappy UX but enough time for the "WOW" effect
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
            }, 800); // Duration of fade-out animation
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? 'none' : 'all',
            transform: fadeOut ? 'scale(1.1)' : 'scale(1)',
        }}>
            {/* Background Grain/Noise for Texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.1,
                background: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                pointerEvents: 'none'
            }}></div>

            {/* Logo Container */}
            <div className="preloader-logo-container" style={{
                position: 'relative',
                width: '300px', // Increased size since rings are gone
                height: '300px',
                marginBottom: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img 
                    src="/logo.png" 
                    alt="CHK Ceylon Tours Logo" 
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 15px rgba(255, 240, 31, 0.4))',
                        animation: 'pulse 2s ease-in-out infinite'
                    }} 
                />
            </div>

            {/* Brand Name with Animated Gradient */}
            <div className="logo-text-container" style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                animation: 'fadeInUp 1s ease-out forwards',
                opacity: 0
            }}>
                <div className="logo-brand" style={{ display: 'flex', alignItems: 'baseline', marginBottom: '5px' }}>
                    <span className="logo-chk" style={{ 
                        fontSize: '4.5rem', 
                        color: 'var(--neon-yellow)',
                        textShadow: '0 0 30px rgba(255, 240, 31, 0.4)',
                        animation: 'shine 3s linear infinite'
                    }}>CHK</span>
                    <span className="logo-ceylon" style={{ 
                        fontSize: '2.2rem',
                        color: 'var(--neon-yellow)',
                        textShadow: '0 0 20px rgba(255, 240, 31, 0.3)',
                        marginLeft: '15px'
                    }}>Ceylon Tours</span>
                </div>
                <div className="logo-tagline" style={{ 
                    fontSize: '0.9rem', 
                    letterSpacing: '5px',
                    color: '#fff',
                    textTransform: 'uppercase',
                    fontWeight: '700'
                }}>OUR WISH IS YOUR HAPPINESS</div>
            </div>

            {/* Progress Bar */}
            <div className="preloader-progress" style={{
                width: '200px',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                marginTop: '30px',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '0%',
                    backgroundColor: 'var(--neon-yellow)',
                    boxShadow: '0 0 10px var(--neon-yellow)',
                    animation: 'loadProgress 2.5s ease-in-out forwards'
                }}></div>
            </div>

            <style jsx global>{`
                @keyframes fadeInUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.9; }
                    50% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.9; }
                }
                @keyframes shine {
                    to { background-position: 200% center; }
                }
                @keyframes loadProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @media (max-width: 768px) {
                    .logo-brand {
                        flex-direction: row !important;
                        gap: 10px !important;
                    }
                    .logo-chk {
                        font-size: 2.8rem !important;
                    }
                    .logo-ceylon {
                        font-size: 1.4rem !important;
                        margin-left: 0 !important;
                    }
                    .logo-tagline {
                        font-size: 0.6rem !important;
                        letter-spacing: 2px !important;
                    }
                    .preloader-logo-container {
                        width: 150px !important;
                        height: 150px !important;
                        margin-bottom: 15px !important;
                    }
                    .preloader-progress {
                        width: 140px !important;
                        margin-top: 20px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Preloader;
