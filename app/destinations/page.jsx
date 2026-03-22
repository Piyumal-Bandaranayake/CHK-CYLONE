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
    image: "/home_hero_bg.png",
    districts: [
      { id: "colombo", name: "Colombo", image: "/galle_face.png" },
      { id: "gampaha", name: "Gampaha", image: "/negombobeach.jpg" },
      { id: "kalutara", name: "Kalutara", image: "/kalutaraBeach.jpg" }
    ]
  },
  {
    id: "central",
    name: "Central Province",
    image: "/kandy.png",
    districts: [
      { id: "kandy", name: "Kandy", image: "/kandy_temple.png" },
      { id: "matale", name: "Matale", image: "/sigiriya.png" },
      { id: "nuwara-eliya", name: "Nuwara Eliya", image: "/tea_hills.png" }
    ]
  },
  {
    id: "southern",
    name: "Southern Province",
    image: "/galle.png",
    districts: [
      { id: "galle", name: "Galle", image: "/galle_fort.png" },
      { id: "matara", name: "Matara", image: "/mirissa.png" },
      { id: "hambantota", name: "Hambantota", image: "/yala_leopard.png" }
    ]
  },
  {
    id: "uva",
    name: "Uva Province",
    image: "/ella.png",
    districts: [
      { id: "badulla", name: "Badulla", image: "/nine_arches.png" },
      { id: "monaragala", name: "Monaragala", image: "/wild_lake.png" }
    ]
  },
  {
    id: "sabaragamuwa",
    name: "Sabaragamuwa Province",
    image: "/adam_peak.png",
    districts: [
      { id: "kegalle", name: "Kegalle", image: "/safari.png" },
      { id: "ratnapura", name: "Ratnapura", image: "/adam_peak.png" }
    ]
  },
  {
    id: "nwp",
    name: "North Western Province",
    image: "/yapahuwa.png",
    districts: [
      { id: "kurunegala", name: "Kurunegala", image: "/yapahuwa.png" },
      { id: "puttalam", name: "Puttalam", image: "/negombobeach.jpg" }
    ]
  },
  {
    id: "ncp",
    name: "North Central Province",
    image: "/ruwanwelisaya.png",
    districts: [
      { id: "anuradhapura", name: "Anuradhapura", image: "/ruwanwelisaya.png" },
      { id: "polonnaruwa", name: "Polonnaruwa", image: "/polonnaruwa_ruins.png" }
    ]
  },
  {
    id: "ep",
    name: "Eastern Province",
    image: "/nilaveli_beach.png",
    districts: [
      { id: "trincomalee", name: "Trincomalee", image: "/nilaveli_beach.png" },
      { id: "batticaloa", name: "Batticaloa", image: "/mirissa.png" },
      { id: "ampara", name: "Ampara", image: "/yala_leopard.png" }
    ]
  },
  {
    id: "np",
    name: "Northern Province",
    image: "/nallur_temple.png",
    districts: [
      { id: "jaffna", name: "Jaffna", image: "/nallur_temple.png" },
      { id: "kilinochchi", name: "Kilinochchi", image: "/nallur_temple.png" },
      { id: "mannar", name: "Mannar", image: "/nallur_temple.png" },
      { id: "mullaitivu", name: "Mullaitivu", image: "/nallur_temple.png" },
      { id: "vavuniya", name: "Vavuniya", image: "/nallur_temple.png" }
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

        // Fetch famous places from DB
        const { data: fData } = await supabase.from('famous_places').select('*');
        
        if (fData && fData.length > 0) {
           // Deep copy static data to merge
           const mergedPlaces = JSON.parse(JSON.stringify(famousPlacesData));
           
           fData.forEach(place => {
             const distId = place.district_id;
             if (mergedPlaces[distId]) {
                 // Check to avoid duplicates if seed_data was used
                 const exists = mergedPlaces[distId].places.some(p => p.name === place.name);
                 if (!exists) {
                    mergedPlaces[distId].places.push({ name: place.name, image: place.image });
                 }
             } else {
                 mergedPlaces[distId] = { name: distId, places: [{ name: place.name, image: place.image }] };
             }
           });
           setDbFamousPlaces(mergedPlaces);
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
