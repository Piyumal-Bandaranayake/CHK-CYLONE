"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const GallerySlider = ({ 
    title = "Our Worldly Journey", 
    subtitle = "Captured Moments" 
}) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setImages(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading || images.length === 0) return null;

    // Triple the array for seamless loop
    const displayImages = [...images, ...images, ...images];

    return (
        <section className="gallery-section overflow-hidden py-32" style={{ background: '#000', position: 'relative' }}>
             {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ bottom: '10%', right: '-10%', opacity: '0.1' }}></div>

            <div className="container mx-auto px-6 mb-20">
                <div className="section-header reveal active">
                    <span className="subtitle" style={{ 
                        color: 'var(--neon-green)', 
                        textShadow: 'var(--neon-glow-green)',
                        letterSpacing: '5px',
                        fontWeight: '900',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '15px'
                    }}>{subtitle}</span>
                    <h2 style={{ 
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                        fontWeight: '950', 
                        color: '#fff', 
                        lineHeight: '1.1',
                        fontFamily: '"Outfit", sans-serif'
                    }}>{title}</h2>
                    <div style={{ width: '80px', height: '4px', background: 'var(--neon-yellow)', marginTop: '25px', borderRadius: '10px', boxShadow: 'var(--neon-glow)' }}></div>
                </div>
            </div>

            <div className="destinations-slider-container w-full overflow-hidden">
                <div className="destinations-slider flex gap-8" style={{ width: 'max-content', animation: 'rotateLeft 60s linear infinite' }}>
                    {displayImages.map((img, idx) => (
                        <div key={idx} className="dest-card" style={{ width: '280px', height: '400px', borderRadius: '30px' }}>
                            <img 
                                src={img.image} 
                                alt={img.country} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85))', opacity: '1' }}></div>
                            <div className="dest-info" style={{ padding: '25px', transform: 'translateY(15px)', transition: 'all 0.5s ease' }}>
                                <h3 style={{ 
                                    color: 'var(--neon-yellow)', 
                                    fontSize: '1.5rem', 
                                    fontWeight: '800', 
                                    marginBottom: '8px',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                    fontFamily: '"Outfit", sans-serif'
                                }}>{img.country}</h3>
                                <p style={{ 
                                    color: '#fff', 
                                    fontSize: '0.85rem', 
                                    fontWeight: '600', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    marginBottom: '20px',
                                    opacity: '0.9'
                                }}>
                                    <i className="fas fa-map-marker-alt" style={{ color: 'var(--neon-green)' }}></i> Visiting Sri Lanka
                                </p>
                                <div className="explore-btn-wrapper">
                                    <div className="dest-explore-btn" style={{ 
                                        padding: '10px 25px', 
                                        fontSize: '0.75rem', 
                                        color: '#fff', 
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(15px)',
                                        fontWeight: '800',
                                        borderRadius: '10px',
                                        display: 'inline-block',
                                        letterSpacing: '1px',
                                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}>EXPLORE</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .dest-card:hover .dest-info {
                    transform: translateY(0);
                }
                .explore-btn-wrapper:hover .dest-explore-btn {
                    background: #fff !important;
                    color: #000 !important;
                    border-color: #fff !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(255,255,255,0.15) !important;
                }
                .destinations-slider:hover {
                    animation-play-state: paused;
                }
                .subtitle {
                    display: inline-block;
                    font-size: 0.9rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 5px;
                    margin-bottom: 15px;
                }
                @media (max-width: 768px) {
                    .dest-card {
                        width: 240px !important;
                        height: 340px !important;
                    }
                    .dest-info h3 {
                        font-size: 1.2rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default GallerySlider;
