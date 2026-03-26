"use client";

import React, { useState, useEffect } from 'react';

const slides = [
    { image: '/hero1.jpg', label: 'Premium Island Experiences' },
    { image: '/hero.jpg', label: 'Coastal Beauty' },
    { image: '/kandy.png', label: 'Ancient Wonders' },
    { image: '/famous_places/arugamBay.jpg', label: 'Highland Serenity' },
];

const Hero = ({ heroData }) => {
    const [current, setCurrent] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setFading(true);
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % slides.length);
                setFading(false);
            }, 600);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    const goTo = (idx) => {
        if (idx === current) return;
        setFading(true);
        setTimeout(() => {
            setCurrent(idx);
            setFading(false);
        }, 600);
    };

    return (
        <section className="hero" style={{ justifyContent: 'center' }}>
            {/* Slides */}
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url('${slide.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'opacity 0.8s ease',
                        opacity: idx === current ? (fading ? 0 : 1) : 0,
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Dark overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
                zIndex: 1
            }} />

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="hero-content">
                    <div style={{ display: 'inline-block', border: '1px solid var(--neon-red)', padding: '5px 15px', borderRadius: '4px', boxShadow: 'var(--neon-glow-red)', marginBottom: '15px' }}>
                        <span className="subtitle" style={{ color: 'var(--neon-red)', margin: 0, textShadow: 'var(--neon-glow-red)', display: 'block', textAlign: 'center', fontSize: '0.8rem', letterSpacing: '3px' }}>
                            {heroData?.subtitle_tag || 'Premium Island Experiences'}
                        </span>
                    </div>
                    <h1 className="reveal active" style={{ textAlign: 'center' }}>
                        {(heroData?.title || 'Visit Sri Lanka').replace('Sri Lanka', 'Sri\u00A0Lanka')}
                    </h1>
                    <div className="hero-btns reveal active" style={{ transitionDelay: '0.6s', justifyContent: 'center' }}>
                        <a href="#destinations" className="btn btn-primary">Start Exploring</a>
                        <a href="#packages" className="btn btn-outline" style={{ marginLeft: '20px' }}>View Packages</a>
                    </div>

                    {/* Dot Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
                        {slides.map((slide, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                title={slide.label}
                                style={{
                                    width: idx === current ? '36px' : '12px',
                                    height: '12px',
                                    borderRadius: '6px',
                                    border: '2px solid var(--neon-yellow)',
                                    background: idx === current ? 'var(--neon-yellow)' : 'transparent',
                                    boxShadow: idx === current ? 'var(--neon-glow)' : 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.4s ease',
                                }}
                            />
                        ))}
                    </div>

                    {/* Slide label */}
                    <p style={{
                        marginTop: '10px',
                        fontSize: '0.8rem',
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: 'var(--neon-yellow)',
                        textShadow: 'var(--neon-glow)',
                        textAlign: 'center',
                        opacity: fading ? 0 : 1,
                        transition: 'opacity 0.4s ease',
                    }}>
                        {slides[current].label}
                    </p>
                </div>
            </div>

            {/* Left / Right Arrows */}
            {['left', 'right'].map(dir => (
                <button
                    key={dir}
                    onClick={() => {
                        const next = dir === 'left'
                            ? (current - 1 + slides.length) % slides.length
                            : (current + 1) % slides.length;
                        goTo(next);
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        [dir]: '30px',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        background: 'rgba(0,0,0,0.4)',
                        border: '2px solid var(--neon-yellow)',
                        color: 'var(--neon-yellow)',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: 'var(--neon-glow)',
                    }}
                >
                    <i className={`fas fa-chevron-${dir === 'left' ? 'left' : 'right'}`} />
                </button>
            ))}
        </section>
    );
};

export default Hero;
