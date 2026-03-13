"use client";

import React from 'react';

const About = () => {
    return (
        <section id="about" className="container" style={{ padding: '100px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div className="reveal">
                <span className="subtitle" style={{ color: 'var(--neon-green)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', textShadow: 'var(--neon-glow-green)' }}>Since 2015</span>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '30px', color: '#fff', lineHeight: '1.1', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>Crafting Memories in Paradise</h2>
                <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.8', marginBottom: '30px' }}>
                    We are more than just a tour operator. We are your local companions, dedicated to showing you the hidden gems and vibrant soul of Sri Lanka.
                    Experience the warmth of Ceylon through our eyes.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: 'var(--neon-yellow)', fontSize: '2rem', textShadow: 'var(--neon-glow)' }}>10k+</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>Happy Guests</p>
                    </div>
                    <div style={{ width: '1px', background: '#333' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ color: 'var(--neon-yellow)', fontSize: '2rem', textShadow: 'var(--neon-glow)' }}>50+</h4>
                        <p style={{ fontSize: '0.9rem', color: '#888' }}>Tour Routes</p>
                    </div>
                </div>
            </div>
            <div className="reveal" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '100%', height: '100%', border: '2px solid var(--neon-yellow)', borderRadius: '30px', zIndex: -1, boxShadow: 'var(--neon-glow)' }}></div>
                <img src="/safari.png" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', display: 'block' }} alt="Sri Lanka Safari" />
                <div className="stat-circle pulse-glow" style={{ position: 'absolute', bottom: '-15px', right: '-15px', background: 'var(--neon-yellow)', border: 'none', color: '#000', width: '120px', height: '120px', boxShadow: 'var(--neon-glow)' }}>
                    <h3 style={{ fontSize: '2rem' }}>99%</h3>
                    <p style={{ fontSize: '0.7rem', opacity: 0.9 }}>Satisfaction</p>
                </div>
            </div>
        </section>
    );
};

export default About;
