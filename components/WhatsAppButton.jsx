"use client";

import React from 'react';

const WhatsAppButton = () => {
    return (
        <a 
            href="https://wa.me/94771234567" 
            className="float-wp pulse-glow" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
            <span className="tooltip">Chat with us!</span>
            <style jsx>{`
                .float-wp {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 65px;
                    height: 65px;
                    background: #25d366;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.2rem;
                    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4);
                    z-index: 10000;
                    text-decoration: none;
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .float-wp:hover {
                    transform: scale(1.1);
                    background: #20ba5a;
                }
                .tooltip {
                    position: absolute;
                    right: 80px;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 10px;
                    font-size: 0.9rem;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s;
                    pointer-events: none;
                }
                .tooltip::after {
                    content: '';
                    position: absolute;
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-left: 5px solid rgba(0, 0, 0, 0.8);
                    border-top: 5px solid transparent;
                    border-bottom: 5px solid transparent;
                }
                .float-wp:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                    right: 75px;
                }
            `}</style>
        </a>
    );
};

export default WhatsAppButton;
