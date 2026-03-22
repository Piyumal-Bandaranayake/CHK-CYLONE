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

            {/* Glowing Logo Circle */}
            <div className="preloader-logo-container" style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                marginBottom: '40px'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid var(--neon-yellow)',
                    boxShadow: '0 0 20px var(--neon-yellow)',
                    animation: 'spin 2s linear infinite'
                }}></div>
                <div className="preloader-logo-inner" style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '2px solid var(--neon-green)',
                    boxShadow: '0 0 15px var(--neon-green)',
                    animation: 'spin 3s linear reverse infinite'
                }}></div>
                <div className="preloader-logo-text" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--neon-yellow)',
                    fontSize: '2rem',
                    fontWeight: '900'
                }}>
                    CHK
                </div>
            </div>

            {/* Brand Name with Animated Gradient */}
            <h1 className="preloader-h1" style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                letterSpacing: '8px',
                color: '#fff',
                textTransform: 'uppercase',
                textAlign: 'center',
                margin: 0,
                background: 'linear-gradient(90deg, #fff, var(--neon-yellow), #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shine 3s linear infinite',
                textShadow: '0 0 30px rgba(255, 240, 31, 0.3)'
            }}>
                Ceylon Tours
            </h1>

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
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes shine {
                    to { background-position: 200% center; }
                }
                @keyframes loadProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @media (max-width: 768px) {
                    .preloader-h1 {
                        font-size: 1.6rem !important;
                        letter-spacing: 4px !important;
                        padding: 0 20px;
                    }
                    .preloader-logo-container {
                        width: 90px !important;
                        height: 90px !important;
                        margin-bottom: 25px !important;
                    }
                    .preloader-logo-inner {
                        width: 65px !important;
                        height: 65px !important;
                        top: 12.5px !important;
                        left: 12.5px !important;
                    }
                    .preloader-logo-text {
                        font-size: 1.4rem !important;
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
