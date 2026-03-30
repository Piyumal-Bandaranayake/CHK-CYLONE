"use client";

import React, { useState } from 'react';

const DistrictPlaces = ({ districtData, onBack }) => {
    const [selectedPlace, setSelectedPlace] = useState(null);

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
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
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
                            height: '320px', 
                            border: '1px solid var(--neon-cyan)',
                            boxShadow: '0 0 15px rgba(3, 233, 244, 0.2)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                        onClick={() => setSelectedPlace(place)}
                    >
                        <img src={place.image} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))' }}></div>
                        
                        <div className="dest-info" style={{ width: '100%', padding: '30px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '0', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                                {place.name || place.name}
                            </h3>
                            <p style={{ color: 'var(--neon-cyan)', fontSize: '0.9rem', marginTop: '10px' }}>
                                View Details <i className="fas fa-expand-alt" style={{ marginLeft: '5px' }}></i>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {selectedPlace && (
                <div style={{ 
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    padding: '20px', backdropFilter: 'blur(10px)' 
                }}
                onClick={() => setSelectedPlace(null)}
                >
                    <div style={{ 
                        background: '#0a0a0a', maxWidth: '950px', width: '100%', 
                        borderRadius: '30px', border: '1px solid var(--neon-yellow)', 
                        overflow: 'hidden', animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 0 50px rgba(255, 240, 31, 0.2)',
                        display: 'flex',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                        position: 'relative'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setSelectedPlace(null)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', backdropFilter: 'blur(5px)', zIndex: 10 }}
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div style={{ 
                            width: window.innerWidth < 768 ? '100%' : '45%', 
                            height: window.innerWidth < 768 ? '250px' : '500px',
                            minHeight: '100%'
                        }}>
                            <img src={selectedPlace.image} alt={selectedPlace.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        
                        <div style={{ 
                            width: window.innerWidth < 768 ? '100%' : '55%', 
                            padding: '40px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h2 style={{ color: 'var(--neon-yellow)', fontSize: '2.4rem', marginBottom: '15px' }}>{selectedPlace.name}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '30px' }}>
                                {selectedPlace.description || "Discover the wonders of this beautiful location in Sri Lanka. Experience its unique culture, history, and natural beauty."}
                            </p>
                            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <a href={`https://wa.me/94776981971?text=Hi CHK Ceylon Tours! I'd like to visit ${selectedPlace.name} in ${districtData.name}. Please provide more details.`} 
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="btn btn-primary" 
                                   style={{ flex: 1, minWidth: '200px', textAlign: 'center', background: 'var(--neon-yellow)', color: '#000', fontWeight: 'bold', border: 'none', padding: '15px' }}>
                                    Plan Visit via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes scaleUp {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default DistrictPlaces;
