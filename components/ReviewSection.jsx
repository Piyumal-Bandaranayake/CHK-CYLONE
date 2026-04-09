"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ReviewCard from './ReviewCard';
import Link from 'next/link';

import GuestMemorySlider from './GuestMemorySlider';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('status', 'approved')
                .order('created_at', { ascending: false })
                .limit(3);

            if (data) setReviews(data);
            setLoading(false);
        };

        fetchReviews();
    }, []);

    if (loading) return null;
    if (reviews.length === 0) return null;

    return (
        <section className="review-section py-32" id="reviews">
            <div className="container mx-auto px-6 relative">
                <div className="section-header text-center mb-24 reveal">
                    <span className="subtitle" style={{ color: '#ffc107', letterSpacing: '5px', fontWeight: '900', textTransform: 'uppercase', display: 'block', marginBottom: '15px' }}>Testimonials</span>
                    <h2 className="title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', color: '#ffffff', lineHeight: '1', fontFamily: '"Outfit", sans-serif' }}>What Our Guests Say</h2>
                    <div style={{ width: '80px', height: '5px', background: '#ffc107', margin: '30px auto', borderRadius: '10px' }}></div>
                    <p className="description mx-auto max-w-2xl" style={{ fontSize: '1.2rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)' }}>
                        Join hundreds of happy travelers who have experienced the magic of Sri Lanka with our expert team.
                    </p>
                </div>

                <div className="reveal" style={{ marginBottom: '100px' }}>
                    <GuestMemorySlider />
                </div>

                <div className="reviews-carousel reveal">
                    {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} className="carousel-item">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>

                <div className="view-more-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '64px' }}>
                    <Link href="/reviews" className="view-all-btn" style={{ 
                        padding: '15px 45px', 
                        background: '#ffc107', 
                        color: '#000', 
                        borderRadius: '50px', 
                        fontWeight: '900', 
                        textDecoration: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '15px',
                        transition: 'all 0.4s ease',
                        boxShadow: '0 15px 35px rgba(255,193,7,0.2)',
                        letterSpacing: '1px',
                        fontSize: '0.9rem'
                    }}>
                        SEE ALL TESTIMONIALS
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .review-section {
                    background: #000000;
                    position: relative;
                    overflow: hidden;
                    padding-bottom: 200px;
                    z-index: 10;
                }
                .reviews-carousel {
                    display: flex;
                    gap: 30px;
                    overflow-x: auto;
                    padding: 20px 5px 40px;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                }
                .reviews-carousel::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
                .carousel-item {
                    min-width: calc(33.333% - 20px);
                    flex-shrink: 0;
                    scroll-snap-align: center;
                }
                @media (max-width: 1024px) {
                    .carousel-item {
                        min-width: calc(50% - 15px);
                    }
                }
                @media (max-width: 768px) {
                    .carousel-item {
                        min-width: calc(100%);
                    }
                }
                .view-all-btn:hover {
                    background: #ffffff;
                    color: #000;
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: 0 25px 50px rgba(255, 255, 255, 0.1);
                }
                .explore-more-card {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 193, 7, 0.05);
                    border: 2px dashed rgba(255, 193, 7, 0.3);
                    border-radius: 20px;
                    width: 100%;
                    aspect-ratio: 1/1;
                    text-decoration: none;
                    transition: all 0.4s ease;
                }
                .explore-more-card:hover {
                    background: rgba(255, 193, 7, 0.1);
                    border-color: #ffc107;
                    transform: scale(0.98);
                }
                .explore-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    color: #ffc107;
                }
                .explore-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #ffc107;
                    color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
                }
                .explore-text {
                    font-weight: 900;
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                    text-align: center;
                }
            `}</style>

        </section>
    );
};

export default ReviewSection;
