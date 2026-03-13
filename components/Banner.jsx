"use client";

import React from 'react';

const Banner = () => {
    return (
        <div className="announcement-banner">
            <p>🌟 Limited Time Offer: Book Your 2026 Sri Lankan Adventure Now and Save 15%! 🌟</p>
            <style jsx>{`
                .announcement-banner {
                    background-color: #fee2e2;
                    color: #991b1b;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 0.9rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    position: relative;
                    z-index: 1001;
                }
                .announcement-banner p {
                    margin: 0;
                }
                @media (max-width: 768px) {
                    .announcement-banner {
                        font-size: 0.8rem;
                        padding: 8px 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Banner;
