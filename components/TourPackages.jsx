import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ImageLightbox from './ImageLightbox';


const fallbackPackages = [
    { name: 'Heritage Legend', price: '850', duration: '7 Days', features: ['Cultural Sites', 'Private Driver', 'Luxury Hotels'], color: 'var(--neon-yellow)' },
    { name: 'Wild Spirit', price: '1200', duration: '10 Days', features: ['Jungle Safari', 'Beach Villa', 'Guided Hikes'], color: 'var(--neon-green)' },
    { name: 'Island Romance', price: '2500', duration: '14 Days', features: ['Honeymoon Decor', 'Candlelight Dinner', 'All Inclusive'], color: 'var(--neon-yellow)' }
];

const TourPackages = () => {
    const [packages, setPackages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false }).limit(3);
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
                    {packages.length > 0 ? (
                        packages.map((pkg, i) => (
                            <div key={i} className="package-card reveal" style={{ 
                                transitionDelay: `${i * 0.2}s`, 
                                borderRadius: '24px', 
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                background: '#0a0a0a'
                            }}>

                                {pkg.image && (
                                     <div style={{ width: '100%', height: '240px', overflow: 'hidden', flexShrink: 0, position: 'relative', cursor: 'pointer' }} onClick={() => setSelectedImage(pkg.image)}>
                                         <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} />
                                         <div style={{ position: 'absolute', top: '20px', left: '20px', background: pkg.color, color: '#000', padding: '5px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' }}>{pkg.duration}</div>
                                     </div>
                                )}

                                <div style={{ padding: '35px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                     <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px', fontWeight: '800' }}>{pkg.name}</h3>
                                     <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '25px' }}>
                                         <span style={{ fontSize: '2.5rem', fontWeight: '900', color: pkg.color, textShadow: `0 0 20px ${pkg.color}44` }}>${pkg.price}</span>
                                         <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>/ person</span>
                                     </div>
                                     <ul style={{ textAlign: 'left', marginBottom: '35px', padding: '0', listStyle: 'none' }}>
                                         {Array.isArray(pkg.features) && pkg.features.slice(0, 3).map((f, j) => (
                                             <li key={j} style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '12px', display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                                                 <i className="fas fa-check-circle" style={{ color: pkg.color, marginRight: '12px', fontSize: '1.1rem' }}></i> {f}
                                             </li>
                                         ))}
                                     </ul>
                                     <a 
                                         href={`https://wa.me/94771234567?text=I'm interested in the ${pkg.name} package`} 
                                         className="btn btn-primary" 
                                         style={{ 
                                             width: '100%', 
                                             textAlign: 'center', 
                                             borderRadius: '15px',
                                             marginTop: 'auto',
                                             background: 'transparent',
                                             border: `1px solid ${pkg.color}`,
                                             color: pkg.color,
                                             padding: '15px 0'
                                         }}
                                     >
                                         ENQUIRE NOW
                                     </a>
                                 </div>

                            </div>
                        ))
                    ) : (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="package-card" style={{ minWidth: '400px', height: '500px', background: '#111', borderRadius: '20px' }}></div>
                        ))
                    )}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }} className="reveal">
                    <a href="/packages" className="btn btn-outline" style={{ borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)' }}>Explore All Packages</a>
                </div>
            </div>
            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>
    );
};


export default TourPackages;
