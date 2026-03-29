"use client";

import React, { useState } from 'react';
import ReviewFormModal from './ReviewFormModal';

const ReviewFloatingButton = () => {
    const [isLabelVisible, setIsLabelVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={() => setIsLabelVisible(true)}
                onMouseLeave={() => setIsLabelVisible(false)}
                className="review-float-btn"
                aria-label="Give us a review"
            >
                <i className="fas fa-star"></i>
                <span className={`review-tooltip ${isLabelVisible ? 'visible' : ''}`}>
                    Leave a Review
                </span>

                <style jsx>{`
                    .review-float-btn {
                        position: fixed;
                        bottom: 110px; /* Above WhatsApp button */
                        right: 30px;
                        width: 65px;
                        height: 65px;
                        background: #ffc107;
                        color: #000;
                        border: none;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                        box-shadow: 0 10px 25px rgba(255, 193, 7, 0.4);
                        z-index: 9999;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                    .review-float-btn:hover {
                        transform: scale(1.1) rotate(15deg);
                        background: #ffca2c;
                        box-shadow: 0 15px 30px rgba(255, 193, 7, 0.5);
                    }
                    .review-tooltip {
                        position: absolute;
                        right: 80px;
                        background: rgba(0, 0, 0, 0.85);
                        color: white;
                        padding: 8px 16px;
                        border-radius: 12px;
                        font-size: 0.9rem;
                        font-weight: 500;
                        white-space: nowrap;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s;
                        pointer-events: none;
                        backdrop-filter: blur(4px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .review-tooltip::after {
                        content: '';
                        position: absolute;
                        right: -6px;
                        top: 50%;
                        transform: translateY(-50%);
                        border-left: 6px solid rgba(0, 0, 0, 0.85);
                        border-top: 6px solid transparent;
                        border-bottom: 6px solid transparent;
                    }
                    .review-tooltip.visible {
                        opacity: 1;
                        visibility: visible;
                        right: 75px;
                    }
                    
                    @media (max-width: 768px) {
                        .review-float-btn {
                            bottom: 100px;
                            right: 20px;
                            width: 55px;
                            height: 55px;
                            font-size: 1.5rem;
                        }
                    }
                `}</style>
            </button>

            {isModalOpen && (
                <ReviewFormModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

export default ReviewFloatingButton;
