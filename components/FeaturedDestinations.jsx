"use client";

import React from 'react';

const FeaturedDestinations = ({ destinations }) => {
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
                            <div className="dest-tag">{dest.tag}</div>
                            <img src={dest.image} alt={dest.title} />
                            <div className="dest-overlay"></div>
                            <div className="dest-info">
                                <h3>{dest.title}</h3>
                                <p><i className="fas fa-map-marker-alt"></i> {dest.location}</p>
                                <button className="btn btn-outline" style={{ 
                                    marginTop: '20px', 
                                    padding: '10px 25px', 
                                    fontSize: '0.8rem', 
                                    color: '#FFD700', 
                                    borderColor: '#FFD700',
                                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                                    fontWeight: 'bold'
                                }}>Explore</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedDestinations;
