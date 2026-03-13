"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const hotelsData = [
    {
        id: 1,
        name: "Heritance Kandalama",
        location: "Dambulla",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
        tag: "Eco Luxury",
        rating: "5.0",
        description: "A luxury hotel built into the rock face, offering breathtaking views of the Kandalama tank."
    },
    {
        id: 2,
        name: "Shangri-La Colombo",
        location: "Colombo",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
        tag: "City View",
        rating: "4.9",
        description: "Modern luxury in the heart of the capital, with world-class dining and views of the Indian Ocean."
    },
    {
        id: 3,
        name: "Anantara Peace Haven",
        location: "Tangalle",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
        tag: "Beachfront",
        rating: "4.8",
        description: "A secluded beach paradise nestled in a coconut plantation on the southern coast."
    },
    {
        id: 4,
        name: "Cinnamon Wild",
        location: "Yala",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        tag: "Safari Lodge",
        rating: "4.7",
        description: "Experience the wild in luxury, located right on the edge of Yala National Park."
    },
    {
        id: 5,
        name: "Amanwella",
        location: "Tangalle",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
        tag: "Ultra Luxury",
        rating: "5.0",
        description: "Sleek, contemporary design meets the golden sands of Tangalle beach."
    },
    {
        id: 6,
        name: "Santani Wellness Resort",
        location: "Kandy",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
        tag: "Wellness",
        rating: "4.9",
        description: "A sustainable wellness retreat set high in the mountains of Kandy."
    },
    {
        id: 7,
        name: "Wild Coast Tented Lodge",
        location: "Yala",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
        tag: "Tent Safari",
        rating: "5.0",
        description: "Unique cocoon-like luxury tents where the jungle meets the ocean."
    },
    {
        id: 8,
        name: "The Fortress Resort & Spa",
        location: "Koggala",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
        tag: "Beach Luxury",
        rating: "4.8",
        description: "Modern luxury inspired by the ancient Dutch fort, right on the beach."
    }
];

export default function Hotels() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>
            <title>Hotels | CHK Ceylon Tours</title>
            
            {/* Hero Section */}
            <section className="hero" style={{ 
                height: '60vh', 
                minHeight: '400px', 
                backgroundImage: "url('/hotel_bg.png')",
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
                            <div className="dest-tag" style={{ background: 'var(--neon-yellow)', color: '#000' }}>{hotel.tag}</div>
                            <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="dest-overlay" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.95))' }}></div>
                            <div className="dest-info" style={{ padding: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--neon-yellow)', marginBottom: '10px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star" style={{ fontSize: '0.8rem', opacity: i < Math.floor(hotel.rating) ? 1 : 0.3 }}></i>
                                    ))}
                                    <span style={{ fontSize: '0.9rem', marginLeft: '5px', fontWeight: 'bold' }}>{hotel.rating}</span>
                                </div>
                                <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>{hotel.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '15px' }}>{hotel.description}</p>
                                <p style={{ color: 'var(--neon-green)', fontSize: '1rem', fontWeight: 'bold' }}>
                                    <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                                    {hotel.location}
                                </p>
                                <button className="btn btn-outline" style={{ marginTop: '20px', width: '100%', borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)' }}>Inquiry Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
