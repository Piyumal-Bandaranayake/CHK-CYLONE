"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewCard from '@/components/ReviewCard';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AllReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reviewsRes, configRes] = await Promise.all([
                    supabase
                        .from('reviews')
                        .select('*')
                        .eq('status', 'approved')
                        .order('created_at', { ascending: false }),
                    fetch('/data/siteConfig.json').then(res => res.json())
                ]);

                if (reviewsRes.data) setReviews(reviewsRes.data);
                if (configRes) setConfig(configRes);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="loading-state h-screen flex items-center justify-center">
                <i className="fas fa-spinner fa-spin text-4xl text-yellow-500"></i>
            </div>
        );
    }

    return (
        <div className="reviews-page min-h-screen">
            <title>Guest Reviews | CHK Ceylon Tours</title>
            <meta name="description" content="Read what our guests have to say about their experiences with CHK Ceylon Tours." />
            
            <Navbar config={config} />

            <header className="hero-header relative overflow-hidden" style={{ 
                height: '60vh', 
                minHeight: '500px', 
                backgroundImage: "url('/dest_hero_bg_new.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                
                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <span className="subtitle" style={{ color: '#ffc107', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Real Experiences</span>
                    <h1 className="title mt-6">Guest Testimonials</h1>
                    <div style={{ width: '80px', height: '5px', background: '#ffc107', margin: '30px auto', borderRadius: '10px', boxShadow: '0 0 20px rgba(255,193,7,0.5)' }}></div>
                    
                    <div className="rating-summary mt-8 inline-flex items-center gap-6 bg-black/60 backdrop-blur-xl px-10 py-5 rounded-full border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star" style={{ color: '#ffc107', textShadow: '0 0 10px rgba(255,193,7,0.5)' }}></i>
                            ))}
                        </div>
                        <div className="h-6 w-[1px] bg-white/20"></div>
                        <span className="font-bold text-xl tracking-wide uppercase text-yellow-500">{reviews.length} Verified Reviews</span>
                    </div>
                </div>
            </header>

            <main className="reviews-content py-32 container mx-auto px-6 relative z-10">
                <div className="reviews-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="reveal active">
                            <ReviewCard review={review} />
                        </div>
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-32 bg-white/5 rounded-[40px] border border-dashed border-white/10 backdrop-blur-md">
                        <i className="fas fa-comment-slash text-6xl text-white/10 mb-8"></i>
                        <h3 className="text-2xl font-bold text-gray-400 font-sans">No reviews yet. Be the first to share your journey!</h3>
                    </div>
                )}
            </main>

            <Footer />

            <style jsx>{`
                .reviews-page {
                    background: #000;
                    color: #fff;
                }
                .reviews-content {
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(255, 193, 7, 0.05) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(57, 255, 20, 0.05) 0px, transparent 50%);
                }
                .subtitle {
                    color: #ffc107;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 6px;
                    font-size: 0.85rem;
                    display: block;
                }
                .title {
                    font-size: clamp(2.5rem, 8vw, 5.5rem);
                    font-weight: 950;
                    font-family: 'Outfit', sans-serif;
                    color: #ffffff;
                    text-transform: uppercase;
                    line-height: 0.9;
                    letter-spacing: -2px;
                    text-shadow: 2px 2px 20px rgba(0,0,0,0.8), var(--neon-glow);
                }
                @media (max-width: 768px) {
                    .title {
                        font-size: 2.2rem;
                        letter-spacing: -1px;
                    }
                    .rating-summary {
                        flex-direction: column;
                        gap: 15px;
                        padding: 30px;
                        border-radius: 30px;
                    }
                    .rating-summary div:nth-child(2) {
                        display: none;
                    }
                }
                .reviews-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 30px;
                }
                @media (min-width: 768px) {
                    .reviews-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .reviews-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            `}</style>
        </div>
    );
}
