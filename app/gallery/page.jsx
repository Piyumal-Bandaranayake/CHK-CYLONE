"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function GalleryPage() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        const observeReveals = () => {
            const reveals = document.querySelectorAll('.reveal:not(.active)');
            reveals.forEach(el => observer.observe(el));
        };

        observeReveals();

        const mutationObserver = new MutationObserver(() => {
            observeReveals();
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return (
        <div className="app-main" style={{ background: '#000', minHeight: '100vh' }}>
            <title>Travel Gallery | CHK Ceylon Tours - Moments in Sri Lanka</title>
            <meta name="description" content="Explore our travel gallery featuring beautiful moments from across Sri Lanka. See the beauty of Ella, Galle, Mirissa and more through our lens." />
            
            <Navbar />

            {/* Hero Section */}
            <section className="hero" style={{
                height: '60vh',
                minHeight: '400px',
                backgroundImage: "url('/gallery_hero_bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                display: 'flex',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
                <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Visual Journey</h1>
                    <p style={{ color: 'var(--neon-green)', fontSize: '1.2rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '3px' }}>Capturing the Essence of Sri Lanka</p>
                </div>
            </section>
            
            <div style={{ background: '#000' }}>
                <Gallery />
            </div>

            <Footer />
            <WhatsAppButton />

            <style jsx>{`
                .app-main {
                    overflow-x: hidden;
                }
            `}</style>
        </div>
    );
}
