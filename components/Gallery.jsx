"use client";

import React from 'react';
import { galleryImages } from '@/data/galleryImages';

const Gallery = () => {
    return (
        <section className="gallery-section" style={{ padding: "100px 0", background: "#050505" }}>
            <div className="container">
                <div className="reveal text-center" style={{ marginBottom: "60px" }}>
                    <span className="subtitle" style={{ color: "var(--neon-green)", textShadow: "0 0 10px rgba(0, 255, 127, 0.4)" }}>Memories in Sri Lanka</span>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginTop: "15px" }}>Our Travel Gallery</h2>
                    <div style={{ width: "80px", height: "4px", background: "var(--neon-yellow)", margin: "20px auto", borderRadius: "10px" }}></div>
                </div>

                <div className="gallery-grid" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
                    gap: "25px", 
                    padding: "20px" 
                }}>
                    {galleryImages.map((image) => (
                        <div key={image.id} className="gallery-item reveal" style={{ 
                            position: "relative", 
                            height: "350px", 
                            borderRadius: "15px", 
                            overflow: "hidden", 
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.5s ease"
                        }}>
                            <img 
                                src={image.url} 
                                alt={image.title} 
                                style={{ 
                                    width: "100%", 
                                    height: "100%", 
                                    objectFit: "cover", 
                                    transition: "transform 0.8s ease" 
                                }} 
                                className="gallery-img"
                            />
                            <div className="gallery-overlay" style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                padding: "20px",
                                background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
                                opacity: 0,
                                transform: "translateY(20px)",
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end"
                            }}>
                                <span style={{ fontSize: "0.75rem", color: "var(--neon-yellow)", textTransform: "uppercase", letterSpacing: "2.5px", fontWeight: "700" }}>{image.category}</span>
                                <h3 style={{ fontSize: "1.25rem", margin: "8px 0 0", color: "#fff", fontWeight: "600", letterSpacing: "0.5px" }}>{image.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .gallery-item:hover {
                    box-shadow: 0 15px 45px rgba(0,0,0,0.9);
                    border-color: var(--neon-yellow);
                    transform: translateY(-5px);
                    z-index: 2;
                }
                .gallery-item:hover .gallery-img {
                    transform: scale(1.1);
                    filter: brightness(0.8) contrast(1.1);
                }
                .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                    transform: translateY(0);
                }
                .text-center {
                    text-align: center;
                }
                @media (max-width: 768px) {
                    .gallery-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                    .gallery-item {
                        height: 350px !important;
                    }
                    .gallery-overlay {
                        opacity: 1 !important;
                        transform: translateY(0) !important;
                        padding: 15px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Gallery;
