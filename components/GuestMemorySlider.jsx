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
