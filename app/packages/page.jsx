"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const packagesData = [
    {
        id: 1,
        name: "Heritage Legend",
        duration: "7 Days / 6 Nights",
        price: "850",
        image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800&auto=format&fit=crop",
        tag: "Cultural",
        color: "var(--neon-yellow)",
        features: ["Sigiriya Rock Fortress", "Temple of the Tooth", "Dambulla Cave Temple", "Village Tour", "Luxury Transports"]
    },
    {
        id: 2,
        name: "Wild Spirit",
        duration: "10 Days / 9 Nights",
        price: "1200",
        image: "https://images.unsplash.com/photo-15809654154fa1-2558aa488f72?q=80&w=800&auto=format&fit=crop",
        tag: "Wildlife",
        color: "var(--neon-green)",
        features: ["Yala Safari", "Udawalawe Elephants", "Whale Watching", "Leopard Tracking", "Glamping Experience"]
    },
    {
        id: 3,
        name: "Island Romance",
        duration: "14 Days / 13 Nights",
        price: "2500",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
        tag: "Honeymoon",
        color: "var(--neon-yellow)",
        features: ["Private Villa", "Candlelight Dinner", "Couple Spa", "Bentota Beach", "Dedicated Driver"]
    },
    {
        id: 4,
        name: "Tea Trail Explorer",
        duration: "5 Days / 4 Nights",
        price: "650",
        image: "https://images.unsplash.com/photo-1528642463363-d4ca3361a293?q=80&w=800&auto=format&fit=crop",
        tag: "Nature",
        color: "var(--neon-green)",
        features: ["Nuwara Eliya Hills", "Tea Factory Visit", "Ella Train Ride", "Horton Plains", "Waterfalls Tour"]
    },
    {
        id: 5,
        name: "Southern Charm",
        duration: "6 Days / 5 Nights",
        price: "720",
        image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800&auto=format&fit=crop",
        tag: "Coastal",
        color: "var(--neon-yellow)",
        features: ["Galle Fort", "Mirissa Surfing", "Unawatuna Beach", "Stilt Fishing", "Seafood Fiesta"]
    },
    {
        id: 6,
        name: "Grand Sri Lanka",
        duration: "21 Days / 20 Nights",
        price: "3800",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        tag: "Full Tour",
        color: "var(--neon-green)",
        features: ["Full Island Circle", "All UNESCO Sites", "North to South", "East Coast Beaches", "Cultural Immersion"]
    }
];

export default function TourPackages() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>
            <title>Tour Packages | CHK Ceylon Tours</title>
            
            {/* Hero Section */}
            <section className="hero" style={{ 
                height: '60vh', 
                minHeight: '400px', 
                backgroundImage: "url('/tour_bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                justifyContent: 'center', 
                alignItems: 'center', 
                padding: '0', 
                position: 'relative' 
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
                <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
                    <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>Curated Journeys</h1>
                    <p style={{ color: 'var(--neon-yellow)', fontSize: '1.2rem', fontWeight: '500', marginTop: '10px' }}>Discover the Magic of Sri Lanka with CHK Ceylon Tours</p>
                </div>
            </section>

            {/* Background blobs for visual flair */}
            <div className="bg-blob" style={{ top: '30%', left: '-10%', width: '800px', height: '800px' }}></div>
            <div className="bg-blob" style={{ top: '60%', right: '-10%', width: '600px', height: '600px', animationDelay: '-5s', background: 'radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, transparent 70%)' }}></div>

            <Navbar />

            <div className="container" style={{ padding: '80px 20px 100px 20px', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span className="subtitle" style={{ color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)' }}>Exclusive Packages</span>
                    <h2 style={{ color: '#fff', fontSize: '2.5rem', marginTop: '10px' }}>Most Common Tour Packages</h2>
                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                    gap: '40px',
                    justifyContent: 'center',
                    maxWidth: '1300px',
                    margin: '0 auto'
                }}>
                    {packagesData.map((pkg) => (
                        <div key={pkg.id} className="package-card" style={{ 
                            background: '#0a0a0a', 
                            borderRadius: '24px', 
                            overflow: 'hidden', 
                            border: `1px solid rgba(255, 255, 255, 0.05)`,
                            transition: 'all 0.4s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{ position: 'relative', height: '240px' }}>
                                <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '20px', 
                                    right: '20px', 
                                    background: pkg.color, 
                                    color: '#000', 
                                    padding: '5px 15px', 
                                    borderRadius: '50px', 
                                    fontSize: '0.8rem', 
                                    fontWeight: 'bold',
                                    zIndex: 2
                                }}>
                                    {pkg.tag}
                                </div>
                                <div style={{ 
                                    position: 'absolute', 
                                    bottom: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '60%', 
                                    background: 'linear-gradient(to top, #0a0a0a, transparent)',
                                    zIndex: 1
                                }}></div>
                            </div>
                            
                            <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                    <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>{pkg.name}</h3>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ color: pkg.color, fontSize: '1.5rem', fontWeight: 'bold' }}>${pkg.price}</span>
                                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', display: 'block' }}>Per Person</span>
                                    </div>
                                </div>
                                
                                <p style={{ color: 'var(--neon-yellow)', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i className="far fa-clock"></i>
                                    {pkg.duration}
                                </p>
                                
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1 }}>
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                                            <i className="fas fa-check-circle" style={{ color: pkg.color, fontSize: '0.9rem' }}></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <a href={`https://wa.me/94771234567?text=I'm interested in the ${pkg.name} package`} 
                                   className="btn btn-primary pulse-glow" 
                                   style={{ 
                                       width: '100%', 
                                       textAlign: 'center', 
                                       justifyContent: 'center',
                                       backgroundColor: 'transparent',
                                       border: `1px solid ${pkg.color}`,
                                       color: pkg.color,
                                       padding: '12px 0'
                                   }}>
                                    Enquire Now
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
