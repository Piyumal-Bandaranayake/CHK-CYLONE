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
        <div className="reviews-page min-h-screen bg-gray-50">
            <title>Guest Reviews | CHK Ceylon Tours</title>
            <meta name="description" content="Read what our guests have to say about their experiences with CHK Ceylon Tours." />
            
            <Navbar config={config} />

            <header className="page-header py-24 bg-white border-b">
                <div className="container mx-auto px-6 text-center">
                    <span className="subtitle">Real Experiences</span>
                    <h1 className="title mt-2">What Our Guests Love</h1>
                    <div className="rating-summary mt-6 flex items-center justify-center gap-4">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-400"></i>
                            ))}
                        </div>
                        <span className="font-semibold text-xl">{reviews.length} Verified Reviews</span>
                    </div>
                </div>
            </header>

            <main className="py-16 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

                {reviews.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                        <i className="fas fa-comment-slash text-5xl text-gray-200 mb-6"></i>
                        <h3 className="text-2xl font-bold text-gray-500">No reviews yet. Be the first to share!</h3>
                    </div>
                )}
            </main>

            <Footer />

            <style jsx>{`
                .subtitle {
                    color: #ffc107;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                }
                .title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    font-family: 'Playfair Display', serif;
                    color: #1a1a1a;
                }
                .page-header {
                    background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
                }
                @media (max-width: 768px) {
                    .title {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
