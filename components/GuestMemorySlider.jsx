"use client";

import React from 'react';
import { guestGalleryData } from '../data/guestGallery';

const GuestMemorySlider = () => {
    // Duplicate data for seamless loop
    const displayImages = [...guestGalleryData, ...guestGalleryData];

    return (
        <div className="guest-memories-wrapper py-10 overflow-hidden" style={{ background: '#000' }}>
            <div className="slider-track" style={{ display: 'flex', gap: '30px', width: 'max-content', animation: 'slideLeft 60s linear infinite' }}>
                {displayImages.map((img, idx) => (
                    <div key={idx} className="guest-memory-card" style={{ 
                        width: '300px', 
                        height: '450px', 
                        borderRadius: '35px', 
                        position: 'relative', 
                        overflow: 'hidden', 
                        flexShrink: 0,
                        border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        <img 
                            src={img.image} 
                            alt={img.country} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div className="card-overlay" style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.95))' 
                        }}></div>
                        
                        <div className="card-info" style={{ 
                            position: 'absolute', 
                            bottom: '30px', 
                            left: '30px', 
                            right: '30px' 
                        }}>
                            <h3 style={{ 
                                color: 'var(--neon-yellow)', 
                                fontSize: '1.8rem', 
                                fontWeight: '900', 
                                marginBottom: '10px',
                                textTransform: 'lowercase',
                                fontFamily: '"Outfit", sans-serif'
                            }}>{img.country}</h3>
                            
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px', 
                                color: 'rgba(255,255,255,0.8)', 
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                marginBottom: '25px'
                            }}>
                                <i className="fas fa-map-marker-alt" style={{ color: 'var(--neon-green)' }}></i>
                                Visiting Sri Lanka
                            </div>
                            
                            <div className="explore-btn" style={{ 
                                display: 'inline-block',
                                padding: '12px 30px',
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '15px',
                                color: '#fff',
                                fontSize: '0.8rem',
                                fontWeight: '800',
                                letterSpacing: '1px',
                                transition: 'all 0.3s ease'
                            }}>EXPLORE</div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes slideLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(calc(-330px * ${guestGalleryData.length})); }
                }
                .slider-track:hover {
                    animation-play-state: paused;
                }
                .guest-memory-card:hover {
                    transform: scale(1.05) translateY(-10px);
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 20px 40px rgba(255, 240, 31, 0.15);
                }
                .guest-memory-card:hover .explore-btn {
                    background: var(--neon-yellow) !important;
                    color: #000 !important;
                    border-color: var(--neon-yellow) !important;
                    box-shadow: 0 0 20px var(--neon-yellow);
                }
                @media (max-width: 768px) {
                    .guest-memory-card {
                        width: 250px !important;
                        height: 380px !important;
                    }
                    @keyframes slideLeft {
                        from { transform: translateX(0); }
                        to { transform: translateX(calc(-280px * ${guestGalleryData.length})); }
                    }
                }
            `}</style>
        </div>
    );
};

export default GuestMemorySlider;
