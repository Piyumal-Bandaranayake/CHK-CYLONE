"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import DistrictPlaces from '../../components/DistrictPlaces';
import { famousPlacesData } from '../../data/famousPlaces';
import { supabase } from '../../lib/supabase';

const provincesData = [
  {
    id: "western",
    name: "Western Province",
    image: "https://images.unsplash.com/photo-1620127814470-3d7f9d846b0d?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "colombo", name: "Colombo", image: "https://images.unsplash.com/photo-1582450871972-abccaecfc1e9?q=80&w=800&auto=format&fit=crop" },
      { id: "gampaha", name: "Gampaha", image: "https://images.unsplash.com/photo-1616422846931-1583d72b83eb?q=80&w=800&auto=format&fit=crop" },
      { id: "kalutara", name: "Kalutara", image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "central",
    name: "Central Province",
    image: "https://images.unsplash.com/photo-1605335198031-6eebd3193e1a?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "kandy", name: "Kandy", image: "https://images.unsplash.com/photo-1585827367980-87747ac7dfd2?q=80&w=800&auto=format&fit=crop" },
      { id: "matale", name: "Matale", image: "https://images.unsplash.com/photo-1581416880097-40c21dc77a94?q=80&w=800&auto=format&fit=crop" },
      { id: "nuwara-eliya", name: "Nuwara Eliya", image: "https://images.unsplash.com/photo-1605232812296-1cdaaaeb2c7c?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "southern",
    name: "Southern Province",
    image: "https://images.unsplash.com/photo-1546708973-c3395414464b?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "galle", name: "Galle", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
      { id: "matara", name: "Matara", image: "https://images.unsplash.com/photo-1588820023611-37d45ddf0f62?q=80&w=800&auto=format&fit=crop" },
      { id: "hambantota", name: "Hambantota", image: "https://images.unsplash.com/photo-1598460599187-200eed59fb96?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "uva",
    name: "Uva Province",
    image: "https://images.unsplash.com/photo-1522244460515-b28e57de2cf5?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "badulla", name: "Badulla", image: "https://images.unsplash.com/photo-1610488665039-3d1226b5ad55?q=80&w=800&auto=format&fit=crop" },
      { id: "monaragala", name: "Monaragala", image: "https://images.unsplash.com/photo-1584988294622-cff2775ae7da?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "sabaragamuwa",
    name: "Sabaragamuwa Province",
    image: "https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "kegalle", name: "Kegalle", image: "https://images.unsplash.com/photo-1630489958043-41bb33318991?q=80&w=800&auto=format&fit=crop" },
      { id: "ratnapura", name: "Ratnapura", image: "https://images.unsplash.com/photo-1581020087815-46fdba93df9e?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "nwp",
    name: "North Western Province",
    image: "https://images.unsplash.com/photo-1618055663731-97ad92b77c5c?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "kurunegala", name: "Kurunegala", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format&fit=crop" },
      { id: "puttalam", name: "Puttalam", image: "https://images.unsplash.com/photo-1594917634212-32a22cc37a6b?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "ncp",
    name: "North Central Province",
    image: "https://images.unsplash.com/photo-1532588045667-bb945d7d0a5e?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "anuradhapura", name: "Anuradhapura", image: "https://images.unsplash.com/photo-1533038590840-1cbea6bc1e28?q=80&w=800&auto=format&fit=crop" },
      { id: "polonnaruwa", name: "Polonnaruwa", image: "https://images.unsplash.com/photo-1632766320074-ceadea9ee104?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "ep",
    name: "Eastern Province",
    image: "https://images.unsplash.com/photo-1579895697334-9aa2aab8b9d4?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "trincomalee", name: "Trincomalee", image: "https://images.unsplash.com/photo-1586526154388-12dce0291fc2?q=80&w=800&auto=format&fit=crop" },
      { id: "batticaloa", name: "Batticaloa", image: "https://images.unsplash.com/photo-1636186000780-87779fdf8bd2?q=80&w=800&auto=format&fit=crop" },
      { id: "ampara", name: "Ampara", image: "https://images.unsplash.com/photo-1574676451694-84c47f70b2df?q=80&w=800&auto=format&fit=crop" }
    ]
  },
  {
    id: "np",
    name: "Northern Province",
    image: "https://images.unsplash.com/photo-1601007831006-2c5050f589db?q=80&w=800&auto=format&fit=crop",
    districts: [
      { id: "jaffna", name: "Jaffna", image: "https://images.unsplash.com/photo-1617260799763-7eb6bc7d6675?q=80&w=800&auto=format&fit=crop" },
      { id: "kilinochchi", name: "Kilinochchi", image: "https://images.unsplash.com/photo-1603590503023-e2bc0478df79?q=80&w=800&auto=format&fit=crop" },
      { id: "mannar", name: "Mannar", image: "https://images.unsplash.com/photo-1606132840502-f617694f4c4a?q=80&w=800&auto=format&fit=crop" },
      { id: "mullaitivu", name: "Mullaitivu", image: "https://images.unsplash.com/photo-1596707328574-e3db7842ebee?q=80&w=800&auto=format&fit=crop" },
      { id: "vavuniya", name: "Vavuniya", image: "https://images.unsplash.com/photo-1616801962386-efecfb834e06?q=80&w=800&auto=format&fit=crop" }
    ]
  }
];

export default function Destinations() {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

  const [dbProvinces, setDbProvinces] = useState(provincesData);
  const [dbFamousPlaces, setDbFamousPlaces] = useState(famousPlacesData);

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        // Fetch provinces and districts
        const { data: pData } = await supabase.from('provinces').select('*, districts(*)');
        if (pData && pData.length > 0) {
           setDbProvinces(pData);
        }

        // Fetch famous places and districts info
        const { data: dData } = await supabase.from('districts').select('*');
        const { data: fData } = await supabase.from('famous_places').select('*');
        
        if (fData && fData.length > 0 && dData && dData.length > 0) {
           const formattedFData = {};
           dData.forEach(dist => {
             formattedFData[dist.id] = { name: dist.name, places: [] };
           });
           fData.forEach(place => {
             if (formattedFData[place.district_id]) {
                formattedFData[place.district_id].places.push({ name: place.name, image: place.image });
             }
           });
           setDbFamousPlaces(formattedFData);
        }
      } catch (err) {
        console.error('Error fetching Supabase data:', err);
      }
    };
    fetchSupabaseData();
  }, []);

  const selectedProvince = dbProvinces.find(p => p.id === selectedProvinceId);
  const selectedDistrictData = selectedDistrictId ? dbFamousPlaces[selectedDistrictId] : null;

  const handleDistrictBack = () => {
    setSelectedDistrictId(null);
  };

  const handleProvinceBack = () => {
    setSelectedProvinceId(null);
    setSelectedDistrictId(null);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', position: 'relative' }}>
      <title>Destinations | CHK Ceylon Tours</title>
      
      {/* Hero Section */}
      <section className="hero" style={{ 
        height: '60vh', 
        minHeight: '400px', 
        backgroundImage: "url('/dest_hero_bg.png')",
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
              {selectedDistrictData ? selectedDistrictData.name : (selectedProvince ? selectedProvince.name : 'Explore Destination')}
            </h1>
        </div>
      </section>

      {/* Background blobs for visual flair */}
      <div className="bg-blob" style={{ top: '50%', left: '-10%' }}></div>
      <div className="bg-blob" style={{ bottom: '10%', right: '-10%', animationDelay: '-5s' }}></div>

      <Navbar />

      <div style={{ padding: '60px 20px 100px 20px', position: 'relative', zIndex: 10 }} id="destinations-grid" className="container">
        
        {selectedDistrictData ? (
          <DistrictPlaces 
            districtData={selectedDistrictData} 
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
                      <span className="dest-tag" style={{ background: 'var(--neon-green)', textShadow: 'none', color: '#000' }}>
                        {province.districts.length} Districts
                      </span>
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
                      <span className="dest-tag" style={{ background: 'var(--secondary)' }}>District</span>
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
    </div>
  );
}
