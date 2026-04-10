"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--dark)', color: 'white', padding: '60px 20px 30px' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <div className="logo" style={{ justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <img src="/logo.png" alt="Logo" className="footer-logo-img" />
                    <div className="logo-text-container">
                        <div className="logo-brand">
                            <span className="logo-chk">CHK</span>
                            <span className="logo-ceylon">CEYLON TOURS</span>
                        </div>
                        <div className="logo-tagline">OUR WISH IS YOUR HAPPINESS</div>
                    </div>
                </div>

                <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
                    <a href="#" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-facebook-f"></i></a>
                    <a href="#" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-instagram"></i></a>
                    <a href="#" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-youtube"></i></a>
                    <a href="#" style={{ color: 'white', fontSize: '1.2rem' }}><i className="fab fa-tripadvisor"></i></a>
                </div>

                <div className="divider" style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '30px' }}></div>

                <div className="bottom-links" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', opacity: 0.6, fontSize: '0.9rem' }}>
                    <p>© 2026 CHK Ceylon Tours. All Rights Reserved.</p>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <a href="/admin/login" style={{ color: 'white' }} title="Admin Login"><i className="fas fa-lock"></i></a>
                        <a href="/about-us" style={{ color: 'white' }}>About Us</a>
                        <a href="#" style={{ color: 'white' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'white' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
