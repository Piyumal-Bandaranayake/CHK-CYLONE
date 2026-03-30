"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';
import ImageLightbox from '@/components/ImageLightbox';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('packages');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = windowWidth <= 991;

  // Form States
  const [packageForm, setPackageForm] = useState({
    name: '', duration: '', price: '', image: '', tag: '', color: 'var(--neon-green)', features: ''
  });

  const [hotelForm, setHotelForm] = useState({
    name: '', location: '', image: '', tag: '', description: '', website_link: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    country: '', image: ''
  });

  const [packageReset, setPackageReset] = useState(0);
  const [hotelReset, setHotelReset] = useState(0);

  // File States
  const [packageFile, setPackageFile] = useState(null);
  const [hotelFile, setHotelFile] = useState(null);
  const [galleryFile, setGalleryFile] = useState(null);

  // Data States
  const [packages, setPackages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // stores the ID of the item being edited
  const [selectedImage, setSelectedImage] = useState(null);


  // Form States (Cont.)
  const [galleryReset, setGalleryReset] = useState(0);

  const [famousPlaceForm, setFamousPlaceForm] = useState({
    name: '', description: '', image: '', province_id: '', district_id: ''
  });
  const [famousPlaceFile, setFamousPlaceFile] = useState(null);
  const [famousPlaceReset, setFamousPlaceReset] = useState(0);
  const [famousPlaces, setFamousPlaces] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);

  const PROVINCES = [
    { id: 'western', name: 'Western Province' },
    { id: 'central', name: 'Central Province' },
    { id: 'southern', name: 'Southern Province' },
    { id: 'uva', name: 'Uva Province' },
    { id: 'sabaragamuwa', name: 'Sabaragamuwa Province' },
    { id: 'nwp', name: 'North Western Province' },
    { id: 'ncp', name: 'North Central Province' },
    { id: 'ep', name: 'Eastern Province' },
    { id: 'np', name: 'Northern Province' }
  ];

  const DISTRICTS_MAP = {
    western: [
      { id: 'colombo', name: 'Colombo' },
      { id: 'gampaha', name: 'Gampaha' },
      { id: 'kalutara', name: 'Kalutara' }
    ],
    central: [
      { id: 'kandy', name: 'Kandy' },
      { id: 'matale', name: 'Matale' },
      { id: 'nuwara-eliya', name: 'Nuwara Eliya' }
    ],
    southern: [
      { id: 'galle', name: 'Galle' },
      { id: 'matara', name: 'Matara' },
      { id: 'hambantota', name: 'Hambantota' }
    ],
    uva: [
      { id: 'badulla', name: 'Badulla' },
      { id: 'monaragala', name: 'Monaragala' }
    ],
    sabaragamuwa: [
      { id: 'kegalle', name: 'Kegalle' },
      { id: 'ratnapura', name: 'Ratnapura' }
    ],
    nwp: [
      { id: 'kurunegala', name: 'Kurunegala' },
      { id: 'puttalam', name: 'Puttalam' }
    ],
    ncp: [
      { id: 'anuradhapura', name: 'Anuradhapura' },
      { id: 'polonnaruwa', name: 'Polonnaruwa' }
    ],
    ep: [
      { id: 'trincomalee', name: 'Trincomalee' },
      { id: 'batticaloa', name: 'Batticaloa' },
      { id: 'ampara', name: 'Ampara' }
    ],
    np: [
      { id: 'jaffna', name: 'Jaffna' },
      { id: 'kilinochchi', name: 'Kilinochchi' },
      { id: 'mannar', name: 'Mannar' },
      { id: 'mullaitivu', name: 'Mullaitivu' },
      { id: 'vavuniya', name: 'Vavuniya' }
    ]
  };

  useEffect(() => {
    // Check if authenticated
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('admin_auth');
      if (!isAuth) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
    }

    fetchData();
  }, [router]);

  useEffect(() => {
    if (famousPlaceForm.province_id) {
      setAvailableDistricts(DISTRICTS_MAP[famousPlaceForm.province_id] || []);
    } else {
      setAvailableDistricts([]);
    }
  }, [famousPlaceForm.province_id]);

  const fetchData = async () => {
    try {
      const { data: pkgData } = await supabase.from('packages').select('*').order('name');
      if (pkgData) setPackages(pkgData);
      
      const { data: htlData } = await supabase.from('hotels').select('*').order('name');
      if (htlData) setHotels(htlData);

      const { data: galData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (galData) setGallery(galData);

      const { data: revData } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (revData) setReviews(revData);

      const { data: famData } = await supabase.from('famous_places').select('*').order('created_at', { ascending: false });
      if (famData) setFamousPlaces(famData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  if (!authenticated) return null; // Wait for auth check


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

  const renderImagePreview = (file, type) => {
    if (!file) return null;
    
    // If it's a direct URL string
    if (typeof file === 'string') {
      return (
        <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
          <img src={file} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
          <button 
            type="button"
            onClick={() => {
              if (type === 'packages') setPackageForm({ ...packageForm, image: '' });
              if (type === 'hotels') setHotelForm({ ...hotelForm, image: '' });
              if (type === 'gallery') setGalleryForm({ ...galleryForm, image: '' });
              if (type === 'famous') setFamousPlaceForm({ ...famousPlaceForm, image: '' });
            }}
            style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className="fas fa-times" style={{ fontSize: '0.8rem' }}></i>
          </button>
        </div>
      );
    }

    // If it's the edit-mode object with a preview property
    if (file.preview) {
      if (!file.preview) return null; // Handle case where image was cleared
      return (
        <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
          <img src={file.preview} alt="Current" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
          <button 
            type="button"
            onClick={() => {
              if (type === 'packages') setPackageForm({ ...packageForm, image: '' });
              if (type === 'hotels') setHotelForm({ ...hotelForm, image: '' });
              if (type === 'gallery') setGalleryForm({ ...galleryForm, image: '' });
              if (type === 'famous') setFamousPlaceForm({ ...famousPlaceForm, image: '' });
            }}
            style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className="fas fa-times" style={{ fontSize: '0.8rem' }}></i>
          </button>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '5px' }}>Current Database Image</p>
        </div>
      );
    }

    // Only if it's a real File or Blob object from the input
    if (file instanceof Blob || file instanceof File) {
      try {
        const objectUrl = URL.createObjectURL(file);
        return (
          <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
            <img src={objectUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
            <button 
              type="button"
              onClick={() => {
                if (type === 'packages') setPackageFile(null);
                if (type === 'hotels') setHotelFile(null);
                if (type === 'gallery') setGalleryFile(null);
                if (type === 'famous') setFamousPlaceFile(null);
              }}
              style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <i className="fas fa-times" style={{ fontSize: '0.8rem' }}></i>
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--neon-green)', marginTop: '5px' }}>New Image Selected</p>
          </div>
        );
      } catch (e) {
        console.error("Preview creation failed", e);
        return null;
      }
    }

    return null;
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = packageForm.image;
      if (packageFile) {
        imageUrl = await uploadImage(packageFile);
      } else if (!isEditing) {
        throw new Error("Please upload an image.");
      }

      const featuresArray = typeof packageForm.features === 'string' 
        ? packageForm.features.split(',').map(f => f.trim()).filter(f => f)
        : packageForm.features;

      const { id, created_at, ...cleanFormData } = packageForm;
      const payload = { ...cleanFormData, image: imageUrl, features: featuresArray };
      
      if (isEditing) {
        const { error } = await supabase.from('packages').update(payload).eq('id', isEditing);
        if (error) throw error;
        showMessage('success', 'Tour Package updated successfully!');
      } else {
        const { error } = await supabase.from('packages').insert([payload]);
        if (error) throw error;
        showMessage('success', 'Tour Package added successfully!');
      }

      setPackageForm({ name: '', duration: '', price: '', tag: '', color: 'var(--neon-green)', features: '' });
      setPackageFile(null);
      setPackageReset(prev => prev + 1);
      setIsEditing(null);
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = hotelForm.image;
      if (hotelFile) {
        imageUrl = await uploadImage(hotelFile);
      } else if (!isEditing) {
        throw new Error("Please upload an image.");
      }

      const { id, created_at, ...cleanHotelData } = hotelForm;
      const payload = { ...cleanHotelData, image: imageUrl };
      
      if (isEditing) {
        const { error } = await supabase.from('hotels').update(payload).eq('id', isEditing);
        if (error) throw error;
        showMessage('success', 'Hotel updated successfully!');
      } else {
        const { error } = await supabase.from('hotels').insert([payload]);
        if (error) throw error;
        showMessage('success', 'Hotel added successfully!');
      }

      setHotelForm({ name: '', location: '', tag: '', description: '', website_link: '' });
      setHotelFile(null);
      setHotelReset(prev => prev + 1);
      setIsEditing(null);
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = galleryForm.image;
      if (galleryFile) {
        imageUrl = await uploadImage(galleryFile);
      } else if (!isEditing) {
        throw new Error("Please upload an image.");
      }

      const { id, created_at, ...cleanGalleryData } = galleryForm;
      const payload = { ...cleanGalleryData, image: imageUrl };
      
      if (isEditing) {
        const { error } = await supabase.from('gallery').update(payload).eq('id', isEditing);
        if (error) throw error;
        showMessage('success', 'Gallery image updated successfully!');
      } else {
        const { error } = await supabase.from('gallery').insert([payload]);
        if (error) throw error;
        showMessage('success', 'Gallery image added successfully!');
      }

      setGalleryForm({ country: '', image: '' });
      setGalleryFile(null);
      setGalleryReset(prev => prev + 1);
      setIsEditing(null);
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleFamousPlaceSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = famousPlaceForm.image;
      if (famousPlaceFile) {
        imageUrl = await uploadImage(famousPlaceFile);
      } else if (!isEditing) {
        throw new Error("Please upload an image.");
      }

      const { id, created_at, ...cleanFormData } = famousPlaceForm;
      const payload = { ...cleanFormData, image: imageUrl };
      
      if (isEditing) {
        const { error } = await supabase.from('famous_places').update(payload).eq('id', isEditing);
        if (error) throw error;
        showMessage('success', 'Famous Place updated successfully!');
      } else {
        const { error } = await supabase.from('famous_places').insert([payload]);
        if (error) throw error;
        showMessage('success', 'Famous Place added successfully!');
      }

      setFamousPlaceForm({ name: '', description: '', image: '', province_id: '', district_id: '' });
      setFamousPlaceFile(null);
      setFamousPlaceReset(prev => prev + 1);
      setIsEditing(null);
      fetchData();
    } catch (error) {
      showMessage('error', error.message);
    }
  };

  const handleDelete = async (table, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      showMessage('success', 'Item deleted successfully!');
      fetchData();
    } catch (error) {
       showMessage('error', error.message);
    }
  };

  const startEdit = (type, item) => {
    setIsEditing(item.id);
    setActiveTab(type);
    if (type === 'packages') setPackageForm({ ...item, features: item.features.join(', ') });
    if (type === 'hotels') setHotelForm({ ...item, website_link: item.website_link || '' });
    if (type === 'gallery') setGalleryForm({ ...item });
    if (type === 'famous') setFamousPlaceForm({ ...item });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewStatus = async (id, status) => {
    try {
      const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
      if (error) throw error;
      showMessage('success', `Review ${status === 'approved' ? 'Approved' : 'Hidden'} successfully!`);
      fetchData();
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
      
      {/* Mobile Top Bar */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          zIndex: 150,
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="logo" style={{ fontSize: '1.2rem', marginBottom: '0' }}>
              <img src="/logo.png" alt="Logo" className="logo-img" style={{ height: '25px', width: 'auto' }} />
              CHK<span>ADMIN</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div 
        className="admin-sidebar"
        style={{ 
          width: '280px', 
          backgroundColor: '#0a0a0a', 
          borderRight: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', 
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 200,
          left: isMobile ? (isSidebarOpen ? '0' : '-280px') : '0',
          transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isMobile && isSidebarOpen ? '0 0 50px rgba(0,0,0,0.8)' : 'none'
        }}
      >
        <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="logo" style={{ fontSize: '1.5rem', marginBottom: '0' }}>
            <img src="/logo.png" alt="Logo" className="logo-img" style={{ height: '30px' }} />
            CHK<span>ADMIN</span>
          </div>
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', paddingLeft: '15px' }}>Management</p>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { id: 'packages', label: 'Tour Packages', icon: 'fa-suitcase-rolling', color: 'var(--neon-green)' },
              { id: 'hotels', label: 'Hotels', icon: 'fa-hotel', color: 'var(--neon-yellow)' },
              { id: 'famous', label: 'Famous Places', icon: 'fa-map-marked-alt', color: 'var(--neon-cyan)' },
              { id: 'gallery', label: 'Travel Gallery', icon: 'fa-images', color: 'var(--neon-blue)' },
              { id: 'reviews', label: 'Guest Reviews', icon: 'fa-star', color: '#ffc107' }
            ].map(item => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '12px',
                    backgroundColor: activeTab === item.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: 'none',
                    color: activeTab === item.id ? item.color : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: activeTab === item.id ? '600' : '400',
                    textAlign: 'left'
                  }}
                >
                  <i className={`fas ${item.icon}`} style={{ fontSize: '1.1rem', width: '25px' }}></i>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', padding: '10px', background: 'rgba(255, 77, 77, 0.1)', 
              border: '1px solid #ff4d4d', color: '#ff4d4d', 
              borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main" style={{ 
        flex: 1, 
        marginLeft: isMobile ? '0' : '280px', 
        padding: isMobile ? '20px' : '40px',
        paddingTop: isMobile ? '90px' : '40px',
        transition: 'all 0.3s ease'
      }}>
        <header className="admin-header" style={{ 
          marginBottom: '40px', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'flex-start' : 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '20px' : '0'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginBottom: '5px' }}>
              {activeTab === 'packages' ? 'Manage Packages' : activeTab === 'hotels' ? 'Manage Hotels' : activeTab === 'famous' ? 'Manage Famous Places' : 'Manage Gallery'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Add and update your travel offerings.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: 0 }}>Admin User</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--neon-green)', margin: 0 }}>System Online</p>
            </div>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--neon-green)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AD</div>
          </div>
        </header>

        {message.text && (
          <div style={{
            padding: '15px 20px', borderRadius: '12px', marginBottom: '30px', fontWeight: 'bold',
            background: message.type === 'success' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(255, 0, 0, 0.1)',
            border: `1px solid ${message.type === 'success' ? 'var(--neon-green)' : 'red'}`,
            color: message.type === 'success' ? 'var(--neon-green)' : '#ff4d4d',
            animation: 'fadeIn 0.3s ease'
          }}>
            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} style={{marginRight: '10px'}}></i>
            {message.text}
          </div>
        )}

        <div style={{ background: '#0a0a0a', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          {/* Packages Form */}
          {activeTab === 'packages' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <form onSubmit={handlePackageSubmit} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px' }}>
                <h2 style={{ marginBottom: '30px', color: 'var(--neon-green)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'}`}></i> {isEditing ? 'Edit Package' : 'Add New Package'}
                </h2>
                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Package Name</label>
                    <input type="text" style={inputStyle} value={packageForm.name} onChange={e => setPackageForm({...packageForm, name: e.target.value})} required placeholder="e.g. Wildlife Safari Explorer" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Duration</label>
                    <input type="text" style={inputStyle} value={packageForm.duration} onChange={e => setPackageForm({...packageForm, duration: e.target.value})} required placeholder="e.g. 5 Days / 4 Nights" />
                  </div>
                </div>

                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Price (USD)</label>
                    <input type="number" style={inputStyle} value={packageForm.price} onChange={e => setPackageForm({...packageForm, price: e.target.value})} required placeholder="e.g. 850" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Card Tag</label>
                    <input type="text" style={inputStyle} value={packageForm.tag} onChange={e => setPackageForm({...packageForm, tag: e.target.value})} required placeholder="e.g. Wildlife" />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Features (comma-separated)</label>
                  <input type="text" style={inputStyle} value={packageForm.features} onChange={e => setPackageForm({...packageForm, features: e.target.value})} required placeholder="e.g. Yala Safari, Glamping, Free Wifi" />
                </div>

                <div style={{ marginBottom: '30px', padding: '20px', borderRadius: '12px', border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <label style={{ display: 'block', marginBottom: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{isEditing ? 'Change Package Image (Optional)' : 'Upload Package Image'}</label>
                  <input type="file" accept="image/*" style={{ ...inputStyle, marginBottom: '0', background: 'transparent', border: 'none', padding: 0 }} onChange={e => setPackageFile(e.target.files[0])} key={`pkg-${packageReset}`} required={!isEditing && !packageForm.image} />
                  {renderImagePreview(packageFile || (isEditing && packageForm.image ? { name: 'Current Image', type: 'image/url', preview: packageForm.image } : null), 'packages')}
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(null); setPackageForm({ name: '', duration: '', price: '', tag: '', color: 'var(--neon-green)', features: '' }); }} style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, background: 'var(--neon-green)', color: '#000', fontWeight: '900', height: '55px', fontSize: '1.1rem' }}>{isEditing ? 'UPDATE PACKAGE' : 'CREATE PACKAGE'}</button>
                </div>
              </form>

              <div>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Current Packages ({packages.length})</h3>
                <div className="admin-data-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {packages.map(pkg => (
                    <div key={pkg.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img 
                        src={pkg.image} 
                        alt={pkg.name} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer' }} 
                        onClick={() => setSelectedImage(pkg.image)}
                      />

                      <h4 style={{ marginBottom: '5px' }}>{pkg.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '15px' }}>{pkg.duration} • ${pkg.price}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEdit('packages', pkg)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(57, 255, 20, 0.1)', color: 'var(--neon-green)', border: '1px solid var(--neon-green)', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('packages', pkg.id)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', cursor: 'pointer' }}><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hotels Form */}
          {activeTab === 'hotels' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <form onSubmit={handleHotelSubmit} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px' }}>
                <h2 style={{ marginBottom: '30px', color: 'var(--neon-yellow)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'}`}></i> {isEditing ? 'Edit Hotel' : 'Add New Hotel'}
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Hotel Name</label>
                    <input type="text" style={inputStyle} value={hotelForm.name} onChange={e => setHotelForm({...hotelForm, name: e.target.value})} required placeholder="e.g. Heritance Tea Factory" />
                  </div>
                </div>

                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Location (City)</label>
                    <input type="text" style={inputStyle} value={hotelForm.location} onChange={e => setHotelForm({...hotelForm, location: e.target.value})} required placeholder="e.g. Nuwara Eliya" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Hotel Tag</label>
                    <input type="text" style={inputStyle} value={hotelForm.tag} onChange={e => setHotelForm({...hotelForm, tag: e.target.value})} required placeholder="e.g. Heritage Luxury" />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Description</label>
                  <textarea style={{...inputStyle, height: '120px', resize: 'vertical'}} value={hotelForm.description} onChange={e => setHotelForm({...hotelForm, description: e.target.value})} required placeholder="Brief description of the hotel's amenities and luxury features..." />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Hotel Website Link (Optional)</label>
                  <input type="url" style={inputStyle} value={hotelForm.website_link || ''} onChange={e => setHotelForm({...hotelForm, website_link: e.target.value})} placeholder="https://www.hotelwebsite.com" />
                </div>

                <div style={{ marginBottom: '30px', padding: '20px', borderRadius: '12px', border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <label style={{ display: 'block', marginBottom: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{isEditing ? 'Change Hotel Image (Optional)' : 'Upload Hotel Image'}</label>
                  <input type="file" accept="image/*" style={{ ...inputStyle, marginBottom: '0', background: 'transparent', border: 'none', padding: 0 }} onChange={e => setHotelFile(e.target.files[0])} key={`hotel-${hotelReset}`} required={!isEditing && !hotelForm.image} />
                  {renderImagePreview(hotelFile || (isEditing && hotelForm.image ? { name: 'Current Image', type: 'image/url', preview: hotelForm.image } : null), 'hotels')}
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(null); setHotelForm({ name: '', location: '', tag: '', description: '', website_link: '' }); }} style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, background: 'var(--neon-yellow)', color: '#000', fontWeight: '900', height: '55px', fontSize: '1.1rem' }}>{isEditing ? 'UPDATE HOTEL' : 'ADD HOTEL'}</button>
                </div>
              </form>

              <div>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Current Hotels ({hotels.length})</h3>
                <div className="admin-data-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {hotels.map(hotel => (
                    <div key={hotel.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer' }} 
                        onClick={() => setSelectedImage(hotel.image)}
                      />

                      <h4 style={{ marginBottom: '5px' }}>{hotel.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '15px' }}>{hotel.location}</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEdit('hotels', hotel)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 240, 31, 0.1)', color: 'var(--neon-yellow)', border: '1px solid var(--neon-yellow)', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('hotels', hotel.id)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', cursor: 'pointer' }}><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gallery Form */}
          {activeTab === 'gallery' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <form onSubmit={handleGallerySubmit} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px' }}>
                <h2 style={{ marginBottom: '30px', color: 'var(--neon-blue)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'}`}></i> {isEditing ? 'Edit Gallery Image' : 'Add New Gallery Image'}
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Country / Region Name</label>
                    <input type="text" style={inputStyle} value={galleryForm.country} onChange={e => setGalleryForm({...galleryForm, country: e.target.value})} required placeholder="e.g. Sri Lanka" />
                  </div>
                </div>

                <div style={{ marginBottom: '30px', padding: '20px', borderRadius: '12px', border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <label style={{ display: 'block', marginBottom: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{isEditing ? 'Change Gallery Image (Optional)' : 'Upload Gallery Image'}</label>
                  <input type="file" accept="image/*" style={{ ...inputStyle, marginBottom: '0', background: 'transparent', border: 'none', padding: 0 }} onChange={e => setGalleryFile(e.target.files[0])} key={`gal-${galleryReset}`} required={!isEditing && !galleryForm.image} />
                  {renderImagePreview(galleryFile || (isEditing && galleryForm.image ? { name: 'Current Image', type: 'image/url', preview: galleryForm.image } : null), 'gallery')}
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(null); setGalleryForm({ country: '', image: '' }); }} style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, background: 'var(--neon-blue)', color: '#000', fontWeight: '900', height: '55px', fontSize: '1.1rem' }}>{isEditing ? 'UPDATE IMAGE' : 'ADD TO GALLERY'}</button>
                </div>
              </form>

              <div>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Travel Gallery ({gallery.length})</h3>
                <div className="admin-data-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {gallery.map(img => (
                    <div key={img.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img 
                        src={img.image} 
                        alt={img.country} 
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer' }} 
                        onClick={() => setSelectedImage(img.image)}
                      />

                      <h4 style={{ marginBottom: '15px' }}>{img.country}</h4>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEdit('gallery', img)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(0, 212, 255, 0.1)', color: 'var(--neon-blue)', border: '1px solid var(--neon-blue)', cursor: 'pointer' }}><i className="fas fa-edit"></i></button>
                        <button onClick={() => handleDelete('gallery', img.id)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', cursor: 'pointer' }}><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Famous Places Form */}
          {activeTab === 'famous' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <form onSubmit={handleFamousPlaceSubmit} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '40px' }}>
                <h2 style={{ marginBottom: '30px', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'}`}></i> {isEditing ? 'Edit Famous Place' : 'Add New Famous Place'}
                </h2>
                
                <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Select Province</label>
                    <select 
                      style={inputStyle} 
                      value={famousPlaceForm.province_id} 
                      onChange={e => setFamousPlaceForm({...famousPlaceForm, province_id: e.target.value, district_id: ''})} 
                      required
                    >
                      <option value="">Choose Province...</option>
                      {PROVINCES.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Select District</label>
                    <select 
                      style={inputStyle} 
                      value={famousPlaceForm.district_id} 
                      onChange={e => setFamousPlaceForm({...famousPlaceForm, district_id: e.target.value})} 
                      required
                      disabled={!famousPlaceForm.province_id}
                    >
                      <option value="">Choose District...</option>
                      {availableDistricts.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Place Name</label>
                  <input type="text" style={inputStyle} value={famousPlaceForm.name} onChange={e => setFamousPlaceForm({...famousPlaceForm, name: e.target.value})} required placeholder="e.g. Sigiriya Rock Fortress" />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Description</label>
                  <textarea 
                    style={{...inputStyle, height: '150px', resize: 'vertical'}} 
                    value={famousPlaceForm.description} 
                    onChange={e => setFamousPlaceForm({...famousPlaceForm, description: e.target.value})} 
                    required 
                    placeholder="Describe this famous place in detail..." 
                  />
                </div>

                <div style={{ marginBottom: '30px', padding: '20px', borderRadius: '12px', border: '2px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                  <label style={{ display: 'block', marginBottom: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{isEditing ? 'Change Photo (Optional)' : 'Upload Place Photo'}</label>
                  <input type="file" accept="image/*" style={{ ...inputStyle, marginBottom: '0', background: 'transparent', border: 'none', padding: 0 }} onChange={e => setFamousPlaceFile(e.target.files[0])} key={`famous-${famousPlaceReset}`} required={!isEditing && !famousPlaceForm.image} />
                  {renderImagePreview(famousPlaceFile || (isEditing && famousPlaceForm.image ? { name: 'Current Image', type: 'image/url', preview: famousPlaceForm.image } : null), 'famous')}
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  {isEditing && (
                    <button type="button" onClick={() => { setIsEditing(null); setFamousPlaceForm({ name: '', description: '', image: '', province_id: '', district_id: '' }); }} style={{ flex: 1, padding: '15px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                  )}
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, background: 'var(--neon-yellow)', color: '#000', fontWeight: '900', height: '55px', fontSize: '1.1rem' }}>{isEditing ? 'UPDATE PLACE' : 'SAVE FAMOUS PLACE'}</button>
                </div>
              </form>

              <div>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Famous Places Database ({famousPlaces.length})</h3>
                <div className="admin-data-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                  {famousPlaces.map(place => (
                    <div key={place.id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <img 
                        src={place.image} 
                        alt={place.name} 
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px', cursor: 'pointer' }} 
                        onClick={() => setSelectedImage(place.image)}
                      />
                      <h4 style={{ marginBottom: '5px', color: 'var(--neon-yellow)' }}>{place.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '5px', textTransform: 'capitalize' }}>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '5px', color: 'var(--neon-yellow)' }}></i> {place.province_id.replace('-', ' ')} / {place.district_id.replace('-', ' ')}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '15px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {place.description}
                      </p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEdit('famous', place)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 240, 31, 0.1)', color: 'var(--neon-yellow)', border: '1px solid var(--neon-yellow)', cursor: 'pointer' }}><i className="fas fa-edit"></i> Edit</button>
                        <button onClick={() => handleDelete('famous_places', place.id)} style={{ flex: 1, padding: '8px', borderRadius: '5px', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', cursor: 'pointer' }}><i className="fas fa-trash"></i> Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Management */}
          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: '#ffc107', display: 'flex', alignItems: 'center', gap: '15px', margin: 0 }}>
                  <i className="fas fa-star"></i> Manage Guest Reviews
                </h2>
                <div style={{ background: 'rgba(255, 193, 7, 0.1)', padding: '8px 20px', borderRadius: '50px', color: '#ffc107', fontSize: '0.9rem', fontWeight: '600' }}>
                  {reviews.length} Total Reviews
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '15px' }}>Date</th>
                      <th style={{ padding: '15px' }}>Guest Name</th>
                      <th style={{ padding: '15px' }}>Country</th>
                      <th style={{ padding: '15px' }}>Rating</th>
                      <th style={{ padding: '15px' }}>Message</th>
                      <th style={{ padding: '15px' }}>Photos</th>
                      <th style={{ padding: '15px' }}>Status</th>
                      <th style={{ padding: '15px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((rev) => (
                      <tr key={rev.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', fontSize: '0.9rem' }}>
                          {new Date(rev.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '15px', fontWeight: '600' }}>{rev.name}</td>
                        <td style={{ padding: '15px', color: 'rgba(255,255,255,0.6)' }}>{rev.country || '-'}</td>
                        <td style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', gap: '3px', color: '#ffc107' }}>
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`${i < rev.rating ? 'fas' : 'far'} fa-star`}></i>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '15px', maxWidth: '300px' }}>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={rev.message}>
                            {rev.message}
                          </p>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            {rev.images && rev.images.slice(0, 2).map((img, i) => (
                              <img 
                                key={i} 
                                src={img} 
                                alt="review" 
                                style={{ width: '35px', height: '35px', borderRadius: '6px', objectFit: 'cover', cursor: 'pointer' }} 
                                onClick={() => setSelectedImage(img)}
                              />
                            ))}

                            {rev.images && rev.images.length > 2 && (
                                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>+{rev.images.length-2}</span>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '15px' }}>
                          <span style={{ 
                            padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
                            background: rev.status === 'approved' ? 'rgba(57, 255, 20, 0.1)' : rev.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                            color: rev.status === 'approved' ? 'var(--neon-green)' : rev.status === 'pending' ? '#ffc107' : '#ff4d4d',
                            border: `1px solid ${rev.status === 'approved' ? 'var(--neon-green)' : rev.status === 'pending' ? '#ffc107' : '#ff4d4d'}`
                          }}>
                            {rev.status}
                          </span>
                        </td>
                        <td style={{ padding: '15px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            {rev.status !== 'approved' && (
                              <button 
                                title="Approve"
                                onClick={() => handleReviewStatus(rev.id, 'approved')}
                                style={{ background: 'rgba(57, 255, 20, 0.1)', color: 'var(--neon-green)', border: '1px solid var(--neon-green)', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                <i className="fas fa-check"></i>
                              </button>
                            )}
                            {rev.status === 'approved' && (
                              <button 
                                title="Hide"
                                onClick={() => handleReviewStatus(rev.id, 'pending')}
                                style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', border: '1px solid #ffc107', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                              >
                                <i className="fas fa-eye-slash"></i>
                              </button>
                            )}
                            <button 
                              title="Delete"
                              onClick={() => handleDelete('reviews', rev.id)}
                              style={{ background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {reviews.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.01)', borderRadius: '20px' }}>
                  <i className="fas fa-comment-slash" style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}></i>
                  <p style={{ color: 'rgba(255,255,255,0.4)' }}>No Guest Reviews Found</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
      <style>{`
        select {
          color-scheme: dark;
        }
        select option {
          background-color: #0a0a0a;
          color: #fff;
          padding: 10px;
        }
        select:focus {
          border-color: var(--neon-cyan) !important;
          box-shadow: 0 0 10px rgba(3, 233, 244, 0.2);
        }
      `}</style>
    </div>
  );
}

