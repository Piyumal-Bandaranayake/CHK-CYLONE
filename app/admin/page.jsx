"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('packages');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Data for Select dropdowns
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    // Fetch lookup data
    const fetchLookups = async () => {
      try {
        const { data: dData } = await supabase.from('districts').select('id, name');
        if (dData) setDistricts(dData);
        
        const { data: pData } = await supabase.from('provinces').select('id, name');
        if (pData) setProvinces(pData);
      } catch (err) {
        console.error('Error fetching lookups:', err);
      }
    };
    fetchLookups();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const [packageForm, setPackageForm] = useState({
    name: '', duration: '', price: '', image: '', tag: '', color: 'var(--neon-green)', features: ''
  });

  const [hotelForm, setHotelForm] = useState({
    name: '', location: '', image: '', tag: '', rating: '5.0', description: ''
  });

  const [placeForm, setPlaceForm] = useState({
    name: '', district_id: '', image: ''
  });

  const [districtForm, setDistrictForm] = useState({
    id: '', province_id: '', name: '', image: ''
  });

  const [packageFile, setPackageFile] = useState(null);
  const [hotelFile, setHotelFile] = useState(null);
  const [placeFile, setPlaceFile] = useState(null);
  const [districtFile, setDistrictFile] = useState(null);

  const uploadImage = async (file) => {
    if (!file) throw new Error("Image file is missing.");
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // Upload the file to 'images' bucket
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);
    if (error) throw new Error("Image Upload Error: " + error.message);
    
    // Get public URL
    const { data: publicData } = supabase.storage.from('images').getPublicUrl(fileName);
    return publicData.publicUrl;
  };

  const renderImagePreview = (file) => {
    if (!file) return null;
    const objectUrl = URL.createObjectURL(file);
    return (
      <div style={{ marginTop: '-10px', marginBottom: '20px' }}>
        <img src={objectUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
      </div>
    );
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(packageFile);
      const featuresArray = packageForm.features.split(',').map(f => f.trim()).filter(f => f);
      const { error } = await supabase.from('packages').insert([{ ...packageForm, image: imageUrl, features: featuresArray }]);
      if (error) throw error;
      showMessage('success', 'Tour Package added successfully!');
      setPackageForm({ name: '', duration: '', price: '', tag: '', color: 'var(--neon-green)', features: '' });
      setPackageFile(null);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(hotelFile);
      const { error } = await supabase.from('hotels').insert([{ ...hotelForm, image: imageUrl }]);
      if (error) throw error;
      showMessage('success', 'Hotel added successfully!');
      setHotelForm({ name: '', location: '', tag: '', rating: '5.0', description: '' });
      setHotelFile(null);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handlePlaceSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(placeFile);
      const { error } = await supabase.from('famous_places').insert([{ ...placeForm, image: imageUrl }]);
      if (error) throw error;
      showMessage('success', 'Famous Place added successfully!');
      setPlaceForm({ name: '', district_id: '' });
      setPlaceFile(null);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDistrictSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(districtFile);
      const { error } = await supabase.from('districts').insert([{
        id: districtForm.id.toLowerCase().replace(/\s+/g, '-'),
        province_id: districtForm.province_id,
        name: districtForm.name,
        image: imageUrl
      }]);
      if (error) throw error;
      showMessage('success', 'District added successfully!');
      setDistrictForm({ id: '', province_id: '', name: '' });
      setDistrictFile(null);
      // update district list
      const { data } = await supabase.from('districts').select('id, name');
      if (data) setDistricts(data);
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 15px', borderRadius: '8px', 
    background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', 
    color: '#fff', marginBottom: '20px', fontSize: '1rem', outline: 'none'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <title>Admin Dashboard | CHK Ceylon Tours</title>
      <Navbar />

      <div className="container" style={{ padding: '120px 20px 100px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', textShadow: 'var(--neon-glow)', color: 'var(--neon-yellow)' }}>Admin Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>Manage your platform listings and database directly from here.</p>
        </div>

        {/* Custom Tabs */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['packages', 'hotels', 'places', 'districts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 25px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer',
                background: activeTab === tab ? 'var(--neon-green)' : 'transparent',
                color: activeTab === tab ? '#000' : 'var(--neon-green)',
                border: `2px solid var(--neon-green)`, transition: 'all 0.3s ease', textTransform: 'capitalize'
              }}
            >
              Add {tab === 'places' ? 'Famous Place' : tab}
            </button>
          ))}
        </div>

        {message.text && (
          <div style={{
            padding: '15px 20px', borderRadius: '8px', marginBottom: '30px', fontWeight: 'bold',
            background: message.type === 'success' ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255, 0, 0, 0.2)',
            border: `1px solid ${message.type === 'success' ? 'var(--neon-green)' : 'red'}`,
            color: message.type === 'success' ? 'var(--neon-green)' : '#ff4d4d'
          }}>
            {message.type === 'success' ? <i className="fas fa-check-circle" style={{marginRight: '10px'}}></i> : <i className="fas fa-exclamation-circle" style={{marginRight: '10px'}}></i>}
            {message.text}
          </div>
        )}

        <div style={{ background: '#0a0a0a', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          {/* Packages Form */}
          {activeTab === 'packages' && (
            <form onSubmit={handlePackageSubmit}>
              <h2 style={{ marginBottom: '30px', color: 'var(--neon-green)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Add Tour Package</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Package Name</label>
                  <input type="text" style={inputStyle} value={packageForm.name} onChange={e => setPackageForm({...packageForm, name: e.target.value})} required placeholder="e.g. Wildlife Safari Explorer" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Duration</label>
                  <input type="text" style={inputStyle} value={packageForm.duration} onChange={e => setPackageForm({...packageForm, duration: e.target.value})} required placeholder="e.g. 5 Days / 4 Nights" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Price (USD)</label>
                  <input type="number" style={inputStyle} value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} required placeholder="e.g. 850" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Card Tag</label>
                  <input type="text" style={inputStyle} value={packageForm.tag} onChange={e => setPackageForm({...packageForm, tag: e.target.value})} required placeholder="e.g. Wildlife" />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image</label>
              <input type="file" accept="image/*" style={inputStyle} onChange={e => setPackageFile(e.target.files[0])} key={packageFile ? packageFile.name : 'empty'} required />
              {renderImagePreview(packageFile)}

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Accent Color</label>
                  <select style={inputStyle} value={packageForm.color} onChange={e => setPackageForm({...packageForm, color: e.target.value})}>
                    <option value="var(--neon-green)">Neon Green</option>
                    <option value="var(--neon-yellow)">Neon Yellow</option>
                    <option value="var(--neon-cyan)">Neon Cyan</option>
                  </select>
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Features (comma-separated)</label>
                  <input type="text" style={inputStyle} value={packageForm.features} onChange={e => setPackageForm({...packageForm, features: e.target.value})} required placeholder="e.g. Yala Safari, Glamping, Free Wifi" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Add Package</button>
            </form>
          )}

          {/* Hotels Form */}
          {activeTab === 'hotels' && (
            <form onSubmit={handleHotelSubmit}>
              <h2 style={{ marginBottom: '30px', color: 'var(--neon-yellow)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Add New Hotel</h2>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Hotel Name</label>
                  <input type="text" style={inputStyle} value={hotelForm.name} onChange={e => setHotelForm({...hotelForm, name: e.target.value})} required placeholder="e.g. Heritance Tea Factory" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
                  <input type="number" step="0.1" style={inputStyle} value={hotelForm.rating} onChange={e => setHotelForm({...hotelForm, rating: e.target.value})} required placeholder="e.g. 5.0" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Location (City)</label>
                  <input type="text" style={inputStyle} value={hotelForm.location} onChange={e => setHotelForm({...hotelForm, location: e.target.value})} required placeholder="e.g. Nuwara Eliya" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Hotel Tag</label>
                  <input type="text" style={inputStyle} value={hotelForm.tag} onChange={e => setHotelForm({...hotelForm, tag: e.target.value})} required placeholder="e.g. Heritage Luxury" />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image</label>
              <input type="file" accept="image/*" style={inputStyle} onChange={e => setHotelFile(e.target.files[0])} key={hotelFile ? hotelFile.name : 'empty'} required />
              {renderImagePreview(hotelFile)}

              <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
              <textarea style={{...inputStyle, height: '100px', resize: 'vertical'}} value={hotelForm.description} onChange={e => setHotelForm({...hotelForm, description: e.target.value})} required placeholder="Brief description of the hotel..." />

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--neon-yellow)', color: '#000', borderColor: 'var(--neon-yellow)' }}>Add Hotel</button>
            </form>
          )}

          {/* Famous Places Form */}
          {activeTab === 'places' && (
            <form onSubmit={handlePlaceSubmit}>
              <h2 style={{ marginBottom: '30px', color: 'var(--neon-cyan)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Add Famous Place</h2>
              
              <label style={{ display: 'block', marginBottom: '5px' }}>Place Name</label>
              <input type="text" style={inputStyle} value={placeForm.name} onChange={e => setPlaceForm({...placeForm, name: e.target.value})} required placeholder="e.g. Sigiriya Rock Fortress" />

              <label style={{ display: 'block', marginBottom: '5px' }}>District</label>
              <select style={inputStyle} value={placeForm.district_id} onChange={e => setPlaceForm({...placeForm, district_id: e.target.value})} required>
                <option value="">Select a District...</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image</label>
              <input type="file" accept="image/*" style={inputStyle} onChange={e => setPlaceFile(e.target.files[0])} key={placeFile ? placeFile.name : 'empty'} required />
              {renderImagePreview(placeFile)}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--neon-cyan)', color: '#000', borderColor: 'var(--neon-cyan)' }}>Add Place</button>
            </form>
          )}

          {/* Districts Form */}
          {activeTab === 'districts' && (
            <form onSubmit={handleDistrictSubmit}>
              <h2 style={{ marginBottom: '30px', color: 'var(--secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>Add District</h2>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>District Name</label>
                  <input type="text" style={inputStyle} value={districtForm.name} onChange={e => {
                    setDistrictForm({
                      ...districtForm, 
                      name: e.target.value,
                      id: e.target.value.toLowerCase().replace(/\s+/g, '-') // Generate ID automatically
                    })
                  }} required placeholder="e.g. Matale" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>ID Code (auto-generated)</label>
                  <input type="text" style={{...inputStyle, background: 'rgba(0,0,0,0.5)', cursor: 'not-allowed'}} value={districtForm.id} disabled readOnly />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: '5px' }}>Province</label>
              <select style={inputStyle} value={districtForm.province_id} onChange={e => setDistrictForm({...districtForm, province_id: e.target.value})} required>
                <option value="">Select a Province...</option>
                {provinces.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image</label>
              <input type="file" accept="image/*" style={inputStyle} onChange={e => setDistrictFile(e.target.files[0])} key={districtFile ? districtFile.name : 'empty'} required />
              {renderImagePreview(districtFile)}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', background: 'var(--secondary)', color: '#fff', borderColor: 'var(--secondary)' }}>Add District</button>
            </form>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
}
