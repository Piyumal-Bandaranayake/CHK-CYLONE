"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

const fallbackHotelsData = [
    {
        id: 'fallback-1',
        name: "Heritance Kandalama",
        location: "Dambulla",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        tag: "Eco Luxury",
        description: "A luxury hotel built into the rock face, offering breathtaking views of the Kandalama tank."
    },
    {
        id: 'fallback-2',
        name: "Shangri-La Colombo",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
        tag: "City View",
        description: "Modern luxury in the heart of the capital, with world-class dining and views of the Indian Ocean."
    },
    {
        id: 'fallback-3',
        name: "Anantara Peace Haven",
        location: "Tangalle",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        tag: "Beachfront",
        description: "A secluded beach paradise nestled in a coconut plantation on the southern coast."
    },
    {
        id: 'fallback-4',
        name: "Cinnamon Wild",
        location: "Yala",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        tag: "Safari Lodge",
        description: "Experience the wild in luxury, located right on the edge of Yala National Park."
    }
];

export default function Hotels() {
    const [hotelsData, setHotelsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const { data, error } = await supabase.from('hotels').select('*');
                if (error) throw error;

                if (data && data.length > 0) {
                    setHotelsData(data);
                } else {
                    setHotelsData(fallbackHotelsData);
                }
            } catch (err) {
                console.error('Error fetching hotels:', err);
                setHotelsData(fallbackHotelsData);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: 'var(--neon-green)', fontSize: '1.5rem', fontWeight: 'bold' }}>Loading Hotels...</div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>
            <title>Luxury Hotels & Stays in Sri Lanka | CHK Ceylon Tours</title>
            <meta name="description" content="Book the finest luxury hotels and eco-lodges in Sri Lanka. From beachfront resorts in Tangalle to safari lodges in Yala, we curate the best stays for your journey." />

            {/* Hero Section */}
            <section className="hero" style={{
                height: '60vh',
                minHeight: '400px',
                backgroundImage: "url('/hotel_bg_new.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
                <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Luxury Stays</h1>
                </div>
            </section>

            <Navbar />

            <div className="container" style={{ padding: '80px 20px 100px 20px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '40px',
                    justifyContent: 'center',
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                    {hotelsData.map((hotel) => (
                        <div key={hotel.id} className="dest-card pulse-glow" style={{ height: '480px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>

                            <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.95))' }}></div>
                            <div className="dest-info" style={{ padding: '30px' }}>
                                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>{hotel.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '15px' }}>{hotel.description}</p>
                                <p style={{ color: 'var(--neon-green)', fontSize: '1rem', fontWeight: 'bold' }}>
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                                    {hotel.location}
                                </p>
                                <a
                                    href={hotel.website_link || `https://wa.me/94771234567?text=I'm interested in booking ${hotel.name} in ${hotel.location}`}
                                    target={hotel.website_link ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                    style={{
                                        marginTop: '25px',
                                        width: '100%',
                                        borderColor: 'var(--neon-yellow)',
                                        color: 'var(--neon-yellow)',
                                        background: 'rgba(0,0,0,0.5)',
                                        textAlign: 'center',
                                        display: 'block',
                                        padding: '12px 0'
                                    }}
                                >
                                    {hotel.website_link ? 'Visit Website' : 'Book Now'}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
