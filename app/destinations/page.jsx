"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DistrictPlaces from '../../components/DistrictPlaces';
import { provincesData } from '../../data/provincesData';
import { supabase } from '../../lib/supabase';

export default function Destinations() {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [dynamicPlaces, setDynamicPlaces] = useState([]);

  // Fetch dynamic famous places when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      fetchDynamicPlaces(selectedDistrictId);
    }
  }, [selectedDistrictId]);

  const fetchDynamicPlaces = async (districtId) => {
    try {
      const { data, error } = await supabase
        .from('famous_places')
        .select('*')
        .eq('district_id', districtId);
      
      if (error) throw error;
      setDynamicPlaces(data || []);
    } catch (err) {
      console.error('Error fetching dynamic places:', err);
    }
  };

  // Use dynamic database data ONLY
  const dbProvinces = provincesData;
  const selectedProvince = dbProvinces.find(p => p.id === selectedProvinceId);

  const districtData = selectedDistrictId ? {
    name: selectedProvince?.districts.find(d => d.id === selectedDistrictId)?.name || 'District',
    places: dynamicPlaces
  } : null;

  const handleDistrictBack = () => {
    setSelectedDistrictId(null);
    setDynamicPlaces([]);
  };

  const handleProvinceBack = () => {
    setSelectedProvinceId(null);
    setSelectedDistrictId(null);
    setDynamicPlaces([]);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>
      <title>Best Destinations in Sri Lanka | CHK Ceylon Tours</title>
      <meta name="description" content="Discover the top travel destinations in Sri Lanka, from the historical ruins of Anuradhapura to the scenic waterfalls of Ella and the beaches of Mirissa." />
      
      {/* Hero Section */}
      <section className="hero" style={{ 
        height: '60vh', 
        minHeight: '400px', 
        backgroundImage: "url('/dest_hero_bg_new.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '0' 
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }}></div>
        <div className="hero-content" style={{ zIndex: 10, padding: '0 20px', textAlign: 'center', maxWidth: '100%', position: 'relative' }}>
            <h1 className="reveal active" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '2px 2px 15px rgba(0, 0, 0, 0.9), var(--neon-glow)' }}>
              {districtData ? districtData.name : (selectedProvince ? selectedProvince.name : 'Explore Destination')}
            </h1>
        </div>
      </section>

      {/* Background blobs for visual flair */}
      <div className="bg-blob" style={{ top: '50%', left: '-10%' }}></div>
      <div className="bg-blob" style={{ bottom: '10%', right: '-10%', animationDelay: '-5s' }}></div>

      <Navbar />

      <div style={{ padding: '60px 20px 100px 20px', position: 'relative', zIndex: 10 }} id="destinations-grid" className="container">
        
        {districtData ? (
          <DistrictPlaces 
            districtData={districtData} 
            onBack={handleDistrictBack} 
          />
        ) : (
          <>
            {selectedProvince && (
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <button 
                  onClick={handleProvinceBack}
                  className="btn btn-primary"
                  style={{ fontSize: '1rem', padding: '10px 30px' }}
                >
                  <i className="fas fa-arrow-left" style={{ marginRight: '10px' }}></i> Back to Provinces
                </button>
              </div>
            )}

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '30px',
              justifyContent: 'center',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {!selectedProvince ? (
                dbProvinces.map((province) => (
                  <div 
                    key={province.id} 
                    className="dest-card pulse-glow" 
                    style={{ 
                      height: '400px', 
                      cursor: 'pointer', 
                      border: '2px solid var(--neon-yellow)',
                      boxShadow: 'var(--neon-glow)'
                    }}
                    onClick={() => setSelectedProvinceId(province.id)}
                  >
                    <img src={province.image} alt={province.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="dest-overlay"></div>
                    <div className="dest-info">

                      <h3 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{province.name}</h3>
                      <button className="btn btn-outline" style={{ marginTop: '5px', padding: '8px 20px', fontSize: '0.9rem', borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)', background: 'rgba(0,0,0,0.6)' }}>
                        View Districts <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                selectedProvince.districts.map((district) => (
                  <div 
                    key={district.id} 
                    className="dest-card pulse-glow" 
                    style={{ 
                      height: '400px', 
                      cursor: 'pointer', 
                      border: '1px solid var(--neon-cyan)',
                      boxShadow: '0 0 15px rgba(3, 233, 244, 0.3)'
                    }}
                    onClick={() => setSelectedDistrictId(district.id)}
                  >
                    <img src={district.image} alt={district.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="dest-overlay"></div>
                    <div className="dest-info">

                      <h3 style={{ fontSize: '1.8rem', color: '#fff', textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                        {district.name}
                      </h3>
                      <button className="btn btn-outline" style={{ marginTop: '5px', padding: '8px 20px', fontSize: '0.9rem', borderColor: 'var(--neon-yellow)', color: 'var(--neon-yellow)', background: 'rgba(0,0,0,0.6)' }}>
                        Famous Places <i className="fas fa-eye" style={{ marginLeft: '5px' }}></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
