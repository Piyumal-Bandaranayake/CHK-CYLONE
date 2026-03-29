import React, { useState } from 'react';
import ImageLightbox from './ImageLightbox';


const ReviewCard = ({ review }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="review-card blur-reveal">
            <div className="card-header">
                <div className="avatar">
                    {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                    <h4>{review.name}</h4>
                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <i 
                                key={i} 
                                className={`fas fa-star ${i < review.rating ? 'active' : ''}`}
                            ></i>
                        ))}
                    </div>
                </div>
                <div className="quote-icon">
                    <i className="fas fa-quote-right"></i>
                </div>
            </div>
            
            <p className="message">"{review.message}"</p>

            {review.images && review.images.length > 0 && (
                <div className="review-gallery">
                    {review.images.map((img, idx) => (
                        <div key={idx} className="thumb" onClick={() => setSelectedImage(img)} style={{ cursor: 'pointer' }}>
                            <img src={img} alt={`Review photo ${idx + 1}`} loading="lazy" />
                        </div>

                    ))}
                </div>
            )}

            <div className="card-footer">
                <span className="date">
                    {new Date(review.created_at).toLocaleDateString()}
                </span>
                <span className="verified">
                    <i className="fas fa-check-circle"></i> Verified Guest
                </span>
            </div>

            <style jsx>{`
                .review-card {
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    padding: 40px;
                    border-radius: 35px;
                    box-shadow: 0 15px 45px rgba(0,0,0,0.04);
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }
                .review-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 6px;
                    background: linear-gradient(90deg, #ffc107, #39FF14);
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                .review-card:hover {
                    transform: translateY(-12px);
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
                    border-color: rgba(255, 193, 7, 0.2);
                }
                .review-card:hover::before {
                    opacity: 1;
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    position: relative;
                    z-index: 1;
                }
                .avatar {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
                    color: black;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    font-size: 1.4rem;
                    box-shadow: 0 10px 20px rgba(255, 193, 7, 0.2);
                    transition: transform 0.5s ease;
                }
                .review-card:hover .avatar {
                    transform: rotate(-5deg) scale(1.05);
                }
                .user-info h4 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #1a1a1a;
                    letter-spacing: -0.5px;
                }
                .rating {
                    display: flex;
                    gap: 4px;
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
                .rating i {
                    color: #e0e0e0;
                    transition: color 0.3s ease;
                }
                .rating i.active {
                    color: #ffc107;
                    text-shadow: 0 0 10px rgba(255, 193, 7, 0.3);
                }
                .quote-icon {
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    font-size: 4rem;
                    color: rgba(255, 193, 7, 0.08);
                    z-index: 0;
                    transform: rotate(10deg);
                }
                .message {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #444;
                    font-style: italic;
                    flex-grow: 1;
                    position: relative;
                    z-index: 1;
                    font-weight: 400;
                }
                .review-gallery {
                    display: flex;
                    gap: 12px;
                    overflow-x: auto;
                    padding: 5px 0;
                    scrollbar-width: none;
                }
                .review-gallery::-webkit-scrollbar {
                    display: none;
                }
                .thumb {
                    width: 85px;
                    height: 85px;
                    flex-shrink: 0;
                    border-radius: 18px;
                    padding: 3px;
                    background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                }
                .thumb:hover {
                    transform: scale(1.08) rotate(2deg);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 15px;
                }
                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9rem;
                    color: #999;
                    border-top: 1px solid rgba(0,0,0,0.06);
                    padding-top: 25px;
                    margin-top: 5px;
                }
                .date {
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }
                .verified {
                    color: #2e7d32;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 700;
                    background: rgba(46, 125, 50, 0.08);
                    padding: 6px 15px;
                    border-radius: 50px;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                }
                @media (max-width: 768px) {
                    .review-card {
                        padding: 30px;
                        border-radius: 28px;
                    }
                    .message {
                        font-size: 1rem;
                    }
                }
            `}</style>

            <ImageLightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};


export default ReviewCard;
