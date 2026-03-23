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
                    CHK<span>CEYLON</span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <ul className={`nav-links ${mobileOpen ? 'active' : ''}`}>
                        <li><a href="/" onClick={() => setMobileOpen(false)}>Home</a></li>
                        <li><a href="/destinations" onClick={() => setMobileOpen(false)}>Destinations</a></li>
                        <li><a href="/packages" onClick={() => setMobileOpen(false)}>Tour Packages</a></li>
                        <li><a href="/hotels" onClick={() => setMobileOpen(false)}>Hotels</a></li>
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
