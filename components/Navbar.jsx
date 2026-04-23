"use client";

import React, { useState, useEffect } from 'react';

const Navbar = ({ config }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/" className="logo">
                    <img src="/logo.png" alt="Logo" className="logo-img" />
                    <div className="logo-text-container">
                        <div className="logo-brand">
                            <span className="logo-chk">CHK</span>
                            <span className="logo-ceylon">CEYLON TOURS</span>
                        </div>
                        <div className="logo-tagline">OUR WISH IS YOUR HAPPINESS</div>
                    </div>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: scrolled ? '20px' : '40px' }}>
                    <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                        <li><a href="/" onClick={() => setMobileOpen(false)}>Home</a></li>
                        <li><a href="/destinations" onClick={() => setMobileOpen(false)}>Destinations</a></li>
                        <li><a href="/packages" onClick={() => setMobileOpen(false)}>Tour Packages</a></li>
                        <li><a href="/hotels" onClick={() => setMobileOpen(false)}>Hotels</a></li>
                        <li><a href="/gallery" onClick={() => setMobileOpen(false)}>Gallery</a></li>
                        <li><a href="/about-us" onClick={() => setMobileOpen(false)}>About Us</a></li>
                    </ul>

                    <div className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                        <i className={mobileOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
