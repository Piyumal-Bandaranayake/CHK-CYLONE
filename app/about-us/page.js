"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GallerySlider from "@/components/GallerySlider";

export default function AboutUs() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/data/siteConfig.json")
            .then((res) => res.json())
            .then((data) => {
                setConfig(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                        }
                    });
                },
                { threshold: 0.1 }
            );

            const observeReveals = () => {
                const reveals = document.querySelectorAll(".reveal:not(.active)");
                reveals.forEach((el) => observer.observe(el));
            };

            observeReveals();
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
            <title>About Us | CHK Ceylon Tours - Your Sri Lanka Travel Experts</title>
            <meta name="description" content="Learn about CHK Ceylon Tours, our mission to provide authentic Sri Lankan experiences, and why we are the top choice for travelers worldwide." />
            <Navbar config={config} />

            <section
                className="hero"
                style={{
                    height: "70vh",
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/dest_hero_bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
            >
                <div className="container">
                    <div className="reveal">
                        <span className="subtitle" style={{ color: "var(--neon-yellow)", textShadow: "var(--neon-glow)" }}>Discover Our Story</span>
                        <h1 style={{ fontSize: "clamp(3rem, 10vw, 6rem)", margin: "20px 0" }}>About CHK Ceylon</h1>
                        <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.2rem", opacity: 0.9 }}>
                            We are more than just a tour company. We are your local partners in discovering the soul of Sri Lanka, making every journey an unforgettable story.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-content" style={{ padding: "100px 0", background: "#000" }}>
                <div className="container">
                    <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "3rem", marginBottom: "30px", color: "var(--neon-yellow)" }}>Our Mission</h2>
                            <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "rgba(255,255,255,0.8)" }}>
                                At CHK Ceylon Tours, our mission is to provide authentic, sustainable, and personalized travel experiences that showcase the true beauty, culture, and hospitality of Sri Lanka.
                            </p>
                            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)" }}>
                                With over 10 years of experience, we've curated journeys for thousands of happy travelers, from the mist-covered tea hills of Ella to the golden beaches of Mirissa and the ancient ruins of Anuradhapura.
                            </p>
                        </div>
                        <div style={{ position: "relative" }}>
                            <img
                                src="/tea_hills.png"
                                alt="Sri Lanka Tea Hills"
                                style={{
                                    width: "100%",
                                    aspectRatio: "4/3",
                                    objectFit: "cover",
                                    display: "block",
                                    borderRadius: "20px",
                                    border: "2px solid var(--neon-yellow)",
                                    boxShadow: "var(--neon-glow)"
                                }}
                            />
                            <div
                                className="bg-blob"
                                style={{ top: "-50px", right: "-50px", width: "300px", height: "300px", opacity: 0.3 }}
                            ></div>
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px" }}>Why Choose Us?</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                            {[
                                { title: "Local Expertise", desc: "Our guides are locals with deep knowledge of every corner of Sri Lanka.", icon: "fa-map-location-dot" },
                                { title: "Tailored Packages", desc: "Every traveler is unique. We customize our packages to match your preferences.", icon: "fa-sliders" },
                                { title: "24/7 Support", desc: "We are always available to assist you during your journey for peace of mind.", icon: "fa-headset" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "40px",
                                        background: "rgba(255,255,255,0.05)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "20px",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        textAlign: "center",
                                        transition: "0.3s"
                                    }}
                                    className="feature-card"
                                >
                                    <i className={`fas ${item.icon}`} style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                    <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>{item.title}</h3>
                                    <p style={{ color: "rgba(255,255,255,0.7)" }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px", color: "var(--neon-yellow)" }}>Our Team</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "60px", alignItems: "start" }}>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/guide.jpeg"
                                        alt="Shashika Lekamarachchi"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", left: "-30px", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>Shashika Lekamarachchi</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Tour Guide</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/assistenmanger.jpeg"
                                        alt="H.G.K Chamathka"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", right: "-30px", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>H.G.K Chamathka</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Assistant Manager</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/touroperator.jpeg"
                                        alt="L.A.U.Amali"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            objectPosition: "top center",
                                            display: "block",
                                            borderRadius: "50%",
                                            border: "4px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div
                                        className="bg-blob"
                                        style={{ top: "-30px", left: "50%", transform: "translateX(-50%)", width: "250px", height: "250px", opacity: 0.3 }}
                                    ></div>
                                </div>
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>L.A.U.Amali</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Tour Operator</p>
                            </div>

                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px" }}>Contact Information</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-map-marker-alt" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Address</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)" }}>No, 4/6, Malwathuhiripitiya, Buthpitiya, Gampaha, Sri Lanka 11054</p>
                            </div>

                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-phone-alt" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Contact Details</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Phone:</strong> 0094776981971</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Office:</strong> 0332279267</p>
                                <p style={{ color: "rgba(255,255,255,0.7)" }}><strong>Email:</strong> shashi198524@gmail.com</p>
                            </div>

                            <div
                                style={{
                                    padding: "40px",
                                    background: "rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "center"
                                }}
                            >
                                <i className="fas fa-clock" style={{ fontSize: "3rem", color: "var(--neon-yellow)", marginBottom: "25px", textShadow: "var(--neon-glow)" }}></i>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Business Hours</h3>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Mon - Fri:</strong> 8.30 am to 11.30 pm</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "5px" }}><strong>Sat - Sun:</strong> 8.30 am to 5.30 pm</p>
                                <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "15px", fontSize: "0.9rem", fontStyle: "italic" }}>(Ill Full Moon Poya Day) Hours might differ</p>
                                <p style={{ color: "var(--neon-yellow)", fontWeight: "bold" }}>24 hours a day Our Special representative for You</p>
                            </div>
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "60px" }}>
                        <div
                            style={{
                                width: "100%",
                                height: "400px",
                                borderRadius: "20px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.1)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                background: "rgba(255,255,255,0.05)"
                            }}
                        >
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src="https://maps.google.com/maps?q=No,+4/6,+Malwathuhiripitiya,+Buthpitiya,+Gampaha,+Sri+Lanka&output=embed"
                                title="CHK Ceylon Tours Location"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>



            <GallerySlider title="Our Travel Gallery" subtitle="Memories in Sri Lanka" />

            <Footer />
            <WhatsAppButton />

            <style jsx>{`
                .feature-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255,255,255,0.08);
                    border-color: var(--neon-yellow);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                @media (max-width: 768px) {
                    .about-content .reveal {
                        grid-template-columns: 1fr !important;
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
}
