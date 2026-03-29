"use client";

import React, { useEffect, useState } from 'react';

const ImageLightbox = ({ src, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (src) {
            document.body.style.overflow = 'hidden';
            
            // Handle Escape key
            const handleEsc = (e) => {
                if (e.key === 'Escape') handleClose();
            };
            window.addEventListener('keydown', handleEsc);
            return () => {
                document.body.style.overflow = 'auto';
                window.removeEventListener('keydown', handleEsc);
            };
        }
    }, [src]);

    if (!src) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300);
    };

    return (
        <div 
            className={`lightbox-overlay ${isClosing ? 'closing' : ''}`}
            onClick={handleClose}
        >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={handleClose} aria-label="Close lightbox">
                    <i className="fas fa-times"></i>
                </button>
                <img src={src} alt="Full view" className="full-image" />
            </div>

            <style jsx>{`
                .lightbox-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(2, 2, 2, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .lightbox-overlay.closing {
                    animation: fadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .lightbox-overlay.closing .lightbox-content {
                    animation: zoomOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .full-image {
                    max-width: 100%;
                    max-height: 85vh;
                    border-radius: 20px;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                    border: 1px solid rgba(255,255,255,0.1);
                    object-fit: contain;
                }
                .close-btn {
                    position: absolute;
                    top: -60px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .close-btn:hover {
                    background: rgba(255,255,255,0.15);
                    transform: rotate(90deg);
                    color: #fff01f;
                    border-color: rgba(255, 240, 31, 0.3);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.9) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes zoomOut {
                    from { transform: scale(1); opacity: 1; }
                    to { transform: scale(0.95); opacity: 0; }
                }
                @media (max-width: 768px) {
                    .close-btn {
                        top: 20px;
                        right: 20px;
                        background: rgba(255,255,255,0.1);
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                    }
                    .lightbox-content {
                        max-width: 95%;
                    }
                    .full-image {
                        border-radius: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ImageLightbox;
