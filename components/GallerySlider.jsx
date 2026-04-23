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
                            <div className="dest-info" style={{ 
                                padding: '25px', 
                                transition: 'all 0.5s ease',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                            }}>
                                <h3 style={{ 
                                    color: 'var(--neon-yellow)', 
                                    fontSize: '1.5rem', 
                                    fontWeight: '800', 
                                    marginBottom: '0',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                    fontFamily: '"Outfit", sans-serif',
                                    textAlign: 'center'
                                }}>{img.country}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .dest-card:hover .dest-info {
                    transform: scale(1.1);
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
