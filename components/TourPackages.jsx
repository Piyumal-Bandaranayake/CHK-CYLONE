import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const fallbackPackages = [
    { name: 'Heritage Legend', price: '850', duration: '7 Days', features: ['Cultural Sites', 'Private Driver', 'Luxury Hotels'], color: 'var(--neon-yellow)' },
    { name: 'Wild Spirit', price: '1200', duration: '10 Days', features: ['Jungle Safari', 'Beach Villa', 'Guided Hikes'], color: 'var(--neon-green)' },
    { name: 'Island Romance', price: '2500', duration: '14 Days', features: ['Honeymoon Decor', 'Candlelight Dinner', 'All Inclusive'], color: 'var(--neon-yellow)' }
];

const TourPackages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data, error } = await supabase.from('packages').select('*').limit(3);
                if (error) throw error;
                if (data && data.length > 0) {
                    setPackages(data.map(p => ({
                        ...p,
                        color: p.color || (Math.random() > 0.5 ? 'var(--neon-yellow)' : 'var(--neon-green)'),
                        features: Array.isArray(p.features) ? p.features : []
                    })));
                } else {
                    setPackages(fallbackPackages);
                }
            } catch (err) {
                console.error('Error fetching packages:', err);
                setPackages(fallbackPackages);
            }
        };
        fetchPackages();
    }, []);

    return (
        <section id="packages" className="packages">
            <div className="container">
                <div className="section-header reveal">
                    <span className="subtitle" style={{ color: 'var(--neon-yellow)', textShadow: 'var(--neon-glow)' }}>Curated Journeys</span>
                    <h2 style={{ color: 'white' }}>Featured Tour Packages</h2>
                </div>
                <div className="package-slider" style={{ paddingBottom: '40px' }}>
                    {packages.map((pkg, i) => (
                        <div key={i} className="package-card reveal" style={{ transitionDelay: `${i * 0.2}s`, background: '#000', borderRadius: '20px', border: `1px solid ${pkg.color}` }}>
                            <div className="package-price" style={{ color: pkg.color, textShadow: `0 0 10px ${pkg.color}` }}>${pkg.price}</div>
                            <h3 style={{ color: '#fff' }}>{pkg.name}</h3>
                            <p style={{ marginBottom: '20px', color: pkg.color, fontWeight: 'bold' }}>{pkg.duration}</p>
                            <ul style={{ textAlign: 'left', marginBottom: '30px' }}>
                                {pkg.features.slice(0, 3).map((f, j) => <li key={j} style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '10px' }}><i className="fas fa-check-circle" style={{ color: pkg.color, marginRight: '10px' }}></i> {f}</li>)}
                            </ul>
                            <a href={`https://wa.me/94771234567?text=I'm interested in the ${pkg.name} package`} className="btn btn-primary pulse-glow" style={{ width: '100%', textAlign: 'center', borderRadius: '50px' }}>Enquire Now</a>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }} className="reveal">
                    <a href="/packages" className="btn btn-outline" style={{ borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)' }}>Explore All Packages</a>
                </div>
            </div>
        </section>
    );
};

export default TourPackages;
