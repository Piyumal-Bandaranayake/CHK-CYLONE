"use client";

import React from 'react';

const CTA = () => {
    return (
        <section id="booking" style={{ padding: '150px 20px', background: 'url("/hero1.jpg") center/cover fixed', textAlign: 'center', position: 'relative' }}>
            <div className="hero-overlay" style={{ background: 'rgba(0,37,26,0.7)', zIndex: 1 }}></div>
            <div className="container reveal" style={{ position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(15px)', padding: '80px 40px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '900px', margin: '0 auto' }}>
                <h2 style={{ color: 'white', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '30px', fontWeight: 900 }}>Ready for Adventure?</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>Join CHK Ceylon and discover the breathtaking beauty of the Pearl of the Indian Ocean.</p>
                <a href="https://wa.me/94771234567" className="btn btn-primary pulse-glow" style={{ padding: '25px 80px', fontSize: '1.3rem', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fab fa-whatsapp" style={{ fontSize: '1.8rem' }}></i>
                    Start Your Journey
                </a>
            </div>
        </section>
    );
};

export default CTA;
