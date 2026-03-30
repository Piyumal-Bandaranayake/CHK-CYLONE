"use client";

import React, { useState } from 'react';
import ImageLightbox from './ImageLightbox';


const FeaturedDestinations = ({ destinations }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    if (!destinations) return null;
    // Double the array to create a seamless infinite loop for the marquee effect
    const displayDestinations = [...destinations, ...destinations];


    return (
        <section id="destinations" className="destinations" style={{ background: '#000' }}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="subtitle" style={{ color: 'var(--neon-green)', textShadow: 'var(--neon-glow-green)' }}>The Best of Ceylon</span>
                    <h2 style={{ color: '#fff' }}>Iconic Locations</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px' }}>
                        Explore the most breathtaking landscapes and cultural heritage sites in Sri Lanka.
                    </p>
                </div>
            </div>

            <div className="destinations-slider-container reveal">
                <div className="destinations-slider">
                    {displayDestinations.map((dest, i) => (
                        <div key={i} className="dest-card">

                            <img src={dest.image} alt={dest.title} style={{ cursor: 'pointer' }} onClick={() => setSelectedImage(dest.image)} />

                            <div className="dest-overlay"></div>
                            <div className="dest-info">
                                <h3>{dest.title}</h3>
                                <p><i className="fas fa-map-marker-alt"></i> {dest.location}</p>
                                <a href={`/destinations#explore`} className="dest-explore-btn" style={{ 
                                    marginTop: '25px', 
                                    padding: '12px 30px', 
                                    fontSize: '0.85rem', 
                                    color: '#fff', 
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: '800',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>EXPLORE</a>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .dest-explore-btn:hover {
                    background: #fff !important;
                    color: #000 !important;
                    border-color: #fff !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(255,255,255,0.2) !important;
                }
            `}</style>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

        </section>
    );
};


export default FeaturedDestinations;
