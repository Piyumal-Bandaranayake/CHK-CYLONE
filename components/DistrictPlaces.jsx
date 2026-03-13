"use client";

import React from 'react';

const DistrictPlaces = ({ districtData, onBack }) => {
    if (!districtData) return null;

    return (
        <div className="reveal active">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <button 
                    onClick={onBack}
                    className="btn btn-primary"
                    style={{ fontSize: '1rem', padding: '10px 30px' }}
                >
                    <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i> Back to Districts
                </button>
                <div style={{ marginTop: '40px' }}>
                    <span className="subtitle" style={{ color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)' }}>Must-Visit Spots</span>
                    <h2 style={{ color: '#fff', fontSize: '2.5rem', marginTop: '10px' }}>Famous Places in {districtData.name}</h2>
                </div>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '30px',
                justifyContent: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {districtData.places.map((place, index) => (
                    <div 
                        key={index} 
                        className="dest-card pulse-glow" 
                        style={{ 
                            height: '400px', 
                            border: '1px solid var(--neon-yellow)',
                            boxShadow: '0 0 15px rgba(255, 240, 31, 0.2)',
                            borderRadius: '24px',
                            overflow: 'hidden'
                        }}
                    >
                        <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.95))' }}></div>
                        
                        <div className="dest-info" style={{ width: '100%', padding: '30px' }}>
                            <div style={{ 
                                display: 'inline-block',
                                background: 'var(--neon-yellow)', 
                                color: '#000',
                                padding: '4px 12px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: '900',
                                marginBottom: '15px',
                                textTransform: 'uppercase'
                            }}>
                                Scenic Spot
                            </div>
                            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0 0 15px 0', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                                {place.name}
                            </h3>
                            <a href={`https://wa.me/94771234567?text=I'd like to visit ${place.name} in ${districtData.name}`} 
                               className="btn btn-outline" 
                               style={{ width: '100%', textAlign: 'center', borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)' }}>
                                Plan Visit
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DistrictPlaces;
