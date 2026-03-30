"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageLightbox from './ImageLightbox';


const Gallery = () => {
    const [dbImages, setDbImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setDbImages(data);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Only fetch and show images uploaded by admin
    const allImages = dbImages.map(img => ({
        id: img.id,
        url: img.image,
        title: img.country, // Show country name as the title
        category: "Gallery"
    }));

    return (
        <section className="gallery-section" id="gallery" style={{ padding: "100px 0", background: "#050505" }}>
            <div className="container">
                <div className="reveal text-center" style={{ marginBottom: "60px" }}>
                    <span className="subtitle" style={{ color: "var(--neon-green)", textShadow: "0 0 10px rgba(0, 255, 127, 0.4)" }}>Memories in Sri Lanka</span>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginTop: "15px" }}>Our Travel Gallery</h2>
                    <div style={{ width: "80px", height: "4px", background: "var(--neon-yellow)", margin: "20px auto", borderRadius: "10px" }}></div>
                </div>

                <div className="gallery-grid" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
                    gap: "40px", 
                    padding: "20px" 
                }}>
                    {allImages.map((image, index) => (
                        <div key={image.id || index} className="gallery-card reveal">
                                <div className="gallery-item" onClick={() => setSelectedImage(image.url)} style={{ 
                                    position: "relative", 
                                    height: "400px", 
                                    borderRadius: "24px", 
                                    overflow: "hidden", 
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                    background: "rgba(255,255,255,0.02)",
                                    cursor: 'pointer'
                                }}>

                                <img 
                                    src={image.url} 
                                    alt={image.title} 
                                    style={{ 
                                        width: "100%", 
                                        height: "100%", 
                                        objectFit: "cover", 
                                        transition: "transform 1.2s ease" 
                                    }} 
                                    className="gallery-img"
                                />
                                <div className="gallery-overlay" style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
                                    opacity: 0,
                                    transition: "opacity 0.6s ease"
                                }}></div>
                            </div>
                            <div className="gallery-info" style={{ 
                                marginTop: "20px", 
                                textAlign: "center",
                                transition: "transform 0.4s ease"
                            }}>
                                <h3 style={{ 
                                    fontSize: "1.5rem", 
                                    margin: "0", 
                                    color: "#fff", 
                                    fontWeight: "600", 
                                    letterSpacing: "1px",
                                    textTransform: "uppercase"
                                }}>{image.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gallery-card:hover .gallery-item {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                    border-color: var(--neon-yellow);
                    transform: translateY(-10px);
                }
                .gallery-card:hover .gallery-img {
                    transform: scale(1.15);
                }
                .gallery-card:hover .gallery-overlay {
                    opacity: 1;
                }
                .gallery-card:hover .gallery-info {
                    transform: translateY(-5px);
                }
                .text-center {
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .gallery-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .gallery-item {
                        height: 350px !important;
                    }
                }
            `}</style>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
};


export default Gallery;
