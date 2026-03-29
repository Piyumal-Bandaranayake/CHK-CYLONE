"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ReviewCard from './ReviewCard';
import Link from 'next/link';

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
                    <h2 className="title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', color: '#1a1a1a', lineHeight: '1', fontFamily: '"Outfit", sans-serif' }}>What Our Guests Say</h2>
                    <div style={{ width: '80px', height: '5px', background: '#ffc107', margin: '30px auto', borderRadius: '10px' }}></div>
                    <p className="description mx-auto max-w-2xl text-gray-500" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
                        Join hundreds of happy travelers who have experienced the magic of Sri Lanka with our expert team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reviews.map((review) => (
                        <div key={review.id} className="reveal">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>

                <div className="view-more-container text-center mt-24 reveal">
                    <Link href="/reviews" className="view-all-btn" style={{ 
                        padding: '18px 45px', 
                        background: '#1a1a1a', 
                        color: '#fff', 
                        borderRadius: '50px', 
                        fontWeight: '900', 
                        textDecoration: 'none', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '15px',
                        transition: 'all 0.4s ease',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                        letterSpacing: '1px'
                    }}>
                        EXPLORE ALL EXPERIENCES
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .review-section {
                    background: #ffffff;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(255, 193, 7, 0.05) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(57, 255, 20, 0.05) 0px, transparent 50%);
                    position: relative;
                    overflow: hidden;
                }
                .view-all-btn:hover {
                    background: #ffc107;
                    color: #000;
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: 0 25px 50px rgba(255, 193, 7, 0.3);
                }
            `}</style>

        </section>
    );
};

export default ReviewSection;
