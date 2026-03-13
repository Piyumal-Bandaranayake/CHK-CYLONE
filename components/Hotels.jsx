"use client";

import React from 'react';

const hotelsData = [
    {
        id: 1,
        name: "Heritance Kandalama",
        location: "Dambulla",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        tag: "Eco Luxury",
        rating: "5.0"
    },
    {
        id: 2,
        name: "Shangri-La Colombo",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
        tag: "City View",
        rating: "4.9"
    },
    {
        id: 3,
        name: "Anantara Peace Haven",
        location: "Tangalle",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        tag: "Beachfront",
        rating: "4.8"
    },
    {
        id: 4,
        name: "Cinnamon Wild",
        location: "Yala",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        tag: "Safari Lodge",
        rating: "4.7"
    }
];

const Hotels = () => {
    return (
        <section id="hotels" style={{ padding: '120px 0', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span className="subtitle" style={{ color: 'var(--neon-green)', textShadow: 'var(--neon-glow-green)' }}>Premium Stays</span>
                    <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Handpicked Hotels</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                        We've curated the most luxurious and authentic stays across the island to ensure your comfort is never compromised.
                    </p>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '30px',
                    perspective: '1000px'
                }}>
                    {hotelsData.map((hotel) => (
                        <div key={hotel.id} className="dest-card reveal" style={{ height: '450px' }}>
                            <div className="dest-tag" style={{ background: 'var(--neon-yellow)', color: '#000' }}>{hotel.tag}</div>
                            <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.9))' }}></div>
                            <div className="dest-info" style={{ padding: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--neon-yellow)', marginBottom: '10px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star" style={{ fontSize: '0.8rem', opacity: i < Math.floor(hotel.rating) ? 1 : 0.3 }}></i>
                                    ))}
                                    <span style={{ fontSize: '0.9rem', marginLeft: '5px', fontWeight: 'bold' }}>{hotel.rating}</span>
                                </div>
                                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>{hotel.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '8px', color: 'var(--neon-green)' }}></i>
                                    {hotel.location}
                                </p>
                                <button className="btn btn-outline" style={{ 
                                    marginTop: '25px', 
                                    width: '100%',
                                    borderColor: 'var(--neon-yellow)',
                                    color: 'var(--neon-yellow)',
                                    background: 'rgba(0,0,0,0.5)'
                                }}>Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal">
                    <a href="/hotels" className="btn btn-primary" style={{ padding: '15px 50px', textDecoration: 'none' }}>
                        Explore More Hotels <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hotels;
