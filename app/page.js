"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SiteStats from '@/components/SiteStats';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Hotels from '@/components/Hotels';
import TourPackages from '@/components/TourPackages';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Banner from '@/components/Banner';

export default function Home() {
    const [destinations, setDestinations] = useState([]);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/data/destinations.json').then(res => res.json()),
            fetch('/data/siteConfig.json').then(res => res.json())
        ])
            .then(([destData, configData]) => {
                setDestinations(destData);
                setConfig(configData);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });

            const observeReveals = () => {
                const reveals = document.querySelectorAll('.reveal:not(.active)');
                reveals.forEach(el => observer.observe(el));
            };

            // Initial check
            observeReveals();

            // Continuously watch for new elements as they are added by sub-components
            const mutationObserver = new MutationObserver(() => {
                observeReveals();
            });

            mutationObserver.observe(document.body, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
                mutationObserver.disconnect();
            };
        }
    }, [loading]);

    if (!config) return null;

    return (
        <div className="app-main">
            <title>Visit Sri Lanka | CHK Ceylon Tours - Official Site</title>
            <meta name="description" content="Official website of CHK Ceylon Tours. Explore the wonders of Sri Lanka with our premium tour packages, luxury hotels, and expert local guides." />
            <Navbar config={config} />
            <Hero heroData={config.hero} />
            <Banner />
            <SiteStats stats={config.stats} />
            <Hotels />
            <FeaturedDestinations destinations={destinations} />
            <TourPackages />
            <CTA />
            <Footer />
            <WhatsAppButton />
        </div>
    );
}
