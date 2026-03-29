"use client";

import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';

const ReviewFormModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
    const [hover, setHover] = useState(null);
    const fileRef = useRef(null);

    const handleImageChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const uploadedImageUrls = [];

            // 1. Upload Images to Supabase Storage
            for (const file of images) {
                const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                
                // Use the 'images' bucket which already exists
                const { data, error: uploadError } = await supabase.storage
                    .from('images')
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    throw uploadError;
                }

                if (data) {
                    const { data: publicData } = supabase.storage
                        .from('images')
                        .getPublicUrl(fileName);
                    uploadedImageUrls.push(publicData.publicUrl);
                }
            }

            // 2. Insert into Reviews Table
            const { error: insertError } = await supabase
                .from('reviews')
                .insert([
                    {
                        name,
                        rating,
                        message,
                        images: uploadedImageUrls,
                        status: 'pending' // Default status
                    }
                ]);

            if (insertError) throw insertError;

            setSubmitStatus('success');
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-pop">
                <button className="close-btn" onClick={onClose} aria-label="Close modal">
                    <i className="fas fa-times"></i>
                </button>

                {submitStatus === 'success' ? (
                    <div className="success-view">
                        <div className="success-icon pulse-glow-2">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p>Your review has been submitted for approval. It will be live soon!</p>
                        <button className="done-btn" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>Share Your Experience</h2>
                            <p>We value your feedback to help us improve our services.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="review-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Your Rating</label>
                                <div className="rating-selector">
                                    {[...Array(5)].map((star, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <label key={index}>
                                                <input 
                                                    type="radio" 
                                                    name="rating" 
                                                    value={ratingValue} 
                                                    onClick={() => setRating(ratingValue)}
                                                />
                                                <i 
                                                    className={`fas fa-star ${ratingValue <= (hover || rating) ? 'active' : ''}`}
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                ></i>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea 
                                    id="message"
                                    rows="4" 
                                    placeholder="Tell us about your trip..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Photos (Optional)</label>
                                <div className="upload-box" onClick={() => fileRef.current.click()}>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <span>{images.length > 0 ? `${images.length} files selected` : 'Drag or click to upload photos'}</span>
                                    <input 
                                        type="file" 
                                        multiple 
                                        accept="image/*" 
                                        hidden 
                                        ref={fileRef}
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {images.length > 0 && (
                                    <div className="image-preview-strip">
                                        {images.map((img, i) => (
                                            <div key={i} className="preview-item">
                                                <img src={URL.createObjectURL(img)} alt="preview" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {submitStatus === 'error' && (
                                <p className="error-msg">Ops! Something went wrong. Please try again.</p>
                            )}

                            <button 
                                type="submit" 
                                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit Review'}
                            </button>
                        </form>
                    </>
                )}
            </div>

            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.7);
                    backdrop-filter: blur(8px);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .modal-content {
                    background: white;
                    width: 100%;
                    max-width: 500px;
                    border-radius: 24px;
                    padding: 40px;
                    position: relative;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .animate-pop {
                    animation: popUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes popUp {
                    0% { transform: scale(0.8) translateY(20px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #f1f1f1;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.2s;
                }
                .close-btn:hover {
                    background: #e1e1e1;
                    transform: rotate(90deg);
                }
                .modal-header h2 {
                    font-size: 2rem;
                    color: #1a1a1a;
                    margin-bottom: 8px;
                    font-family: 'Outfit', sans-serif;
                }
                .modal-header p {
                    color: #666;
                    margin-bottom: 30px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #333;
                }
                input, textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: 0.2s;
                    font-family: inherit;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #ffc107;
                    box-shadow: 0 0 0 4px rgba(255,193,7,0.1);
                }
                .rating-selector {
                    display: flex;
                    gap: 8px;
                }
                .rating-selector i {
                    font-size: 1.8rem;
                    color: #ddd;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .rating-selector i.active {
                    color: #ffc107;
                }
                .rating-selector input {
                    display: none;
                }
                .upload-box {
                    border: 2px dashed #ddd;
                    padding: 24px;
                    border-radius: 12px;
                    text-align: center;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    transition: 0.2s;
                    color: #666;
                }
                .upload-box:hover {
                    border-color: #ffc107;
                    background: rgba(255,193,7,0.05);
                }
                .upload-box i {
                    font-size: 2rem;
                }
                .image-preview-strip {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                    overflow-x: auto;
                    padding-bottom: 5px;
                }
                .preview-item img {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: #ffc107;
                    color: #000;
                    border: none;
                    border-radius: 14px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                    margin-top: 10px;
                }
                .submit-btn:hover:not(:disabled) {
                    background: #ffb300;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .error-msg {
                    color: #d32f2f;
                    font-size: 0.9rem;
                    margin-bottom: 15px;
                }
                .success-view {
                    text-align: center;
                    padding: 40px 0;
                }
                .success-icon {
                    font-size: 5rem;
                    color: #2e7d32;
                    margin-bottom: 24px;
                }
                .success-view h3 {
                    font-size: 2.2rem;
                    margin-bottom: 12px;
                }
                .success-view p {
                    color: #666;
                    margin-bottom: 30px;
                }
                .done-btn {
                    padding: 12px 40px;
                    background: #2e7d32;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 600;
                    cursor: pointer;
                }
                .pulse-glow-2 {
                    animation: pulse2 2s infinite;
                }
                @keyframes pulse2 {
                    0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(46, 125, 50, 0)); }
                    50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(46, 125, 50, 0.4)); }
                    100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(46, 125, 50, 0)); }
                }
            `}</style>
        </div>
    );
};

export default ReviewFormModal;
