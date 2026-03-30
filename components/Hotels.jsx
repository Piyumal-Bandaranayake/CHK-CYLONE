import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ImageLightbox from './ImageLightbox';


const fallbackHotelsData = [
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
    const [hotels, setHotels] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const { data, error } = await supabase.from('hotels').select('*').order('created_at', { ascending: false }).limit(4);
                if (error) throw error;
                if (data && data.length > 0) {
                    setHotels(data);
                } else {
                    setHotels(fallbackHotelsData);
                }
            } catch (err) {
                console.error('Error fetching hotels:', err);
                setHotels(fallbackHotelsData);
            }
        };
        fetchHotels();
    }, []);

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
                    {hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <div key={hotel.id} className="dest-card reveal" style={{ height: '480px', borderRadius: '24px' }}>
                                <img 
                                    src={hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'} 
                                    alt={hotel.name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }} 
                                    onClick={() => setSelectedImage(hotel.image)}
                                />
                                <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.8) 100%)', opacity: 0.8 }}></div>
                                <div className="dest-info" style={{ padding: '35px', width: '100%', bottom: '0' }}>
                                    <div style={{ background: 'var(--neon-green)', color: '#000', padding: '4px 12px', borderRadius: '50px', display: 'inline-block', fontSize: '0.7rem', fontWeight: '900', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>{hotel.tag || 'Luxury Stay'}</div>
                                    <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '10px', fontWeight: '800', lineHeight: '1.2' }}>{hotel.name}</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <i className="fas fa-map-marker-alt" style={{ color: 'var(--neon-green)' }}></i>
                                        {hotel.location}
                                    </p>
                                    <a 
                                        href={hotel.website_link || `https://wa.me/94771234567?text=I'm interested in booking ${hotel.name} in ${hotel.location}`} 
                                        target={hotel.website_link ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="hotel-btn" 
                                        style={{ 
                                            marginTop: '25px', 
                                            width: '100%',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: '#fff',
                                            background: 'rgba(255,255,255,0.1)',
                                            backdropFilter: 'blur(10px)',
                                            textAlign: 'center',
                                            display: 'block',
                                            padding: '14px 0',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            letterSpacing: '1px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {hotel.website_link ? 'VISIT WEBSITE' : 'BOOK EXPERIENCE'}
                                    </a>
                                </div>
                            </div>

                        ))
                    ) : (
                        // Skeleton/Loading states
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="dest-card" style={{ height: '450px', background: '#111', borderRadius: '12px' }}></div>
                        ))
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '60px' }} className="reveal">
                    <a href="/hotels" className="btn btn-primary" style={{ padding: '15px 50px', textDecoration: 'none' }}>
                        Explore More Hotels <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
                    </a>
                </div>
            </div>
            <style jsx>{`
                .hotel-btn:hover {
                    background: var(--neon-green) !important;
                    color: #000 !important;
                    border-color: var(--neon-green) !important;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(57, 255, 20, 0.3);
                }
            `}</style>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />

        </section>
    );
};


export default Hotels;
