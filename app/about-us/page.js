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
                        <span className="subtitle" style={{ color: "var(--neon-yellow)", textShadow: "var(--neon-glow)" }}>A Journey in Pursuit of Memories</span>
                        <h1 style={{ fontSize: "clamp(3.5rem, 8vw, 4.5rem)", margin: "20px 0", lineHeight: "1.1" }}>About Us</h1>

                    </div>
                </div>
            </section>

            <section className="about-content" style={{ padding: "100px 0", background: "#000" }}>
                <div className="container">
                    <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "var(--neon-yellow)" }}>Our Story</h2>
                            <p style={{ fontSize: "1.1rem", marginBottom: "25px", color: "rgba(255,255,255,0.9)", lineHeight: "1.6" }}>
                                This is precisely the experience we, as C.H.K Ceylon, have provided to travelers from around the world for 15 years. This is not just a business; it is the story of a trusting bond built between you, who come to discover the beauty of Sri Lanka, and us.
                            </p>
                            <p style={{ fontSize: "1.1rem", marginBottom: "25px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", borderLeft: "4px solid var(--neon-yellow)", paddingLeft: "20px" }}>
                                "Travel is not just moving from one place to another; it's a unique journey that adds new experiences, memories, and friendships to life."
                            </p>
                            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                                Starting small 15 years ago with the aim to showcase the hidden beauty of this blessed land, Sri Lanka, CHK Ceylon has today become a leading travel guide service trusted by thousands of local and foreign tourists.
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
                        <div className="reveal" style={{ marginTop: "100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                            <div style={{ order: 2 }}>
                                <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "var(--neon-yellow)" }}>Why Our 15 Years Matter</h2>
                                <p style={{ fontSize: "1.1rem", marginBottom: "20px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                                    Over the past decade and a half, we learned not just road maps. We understood the heartbeat of tourists coming from different countries and cultures. What they truly expect is freedom, safety, and hospitality.
                                </p>
                                <ul style={{ listStyle: "none", padding: 0, margin: "30px 0" }}>
                                    {[
                                        { t: "We are not just Guides", d: "We are your travel companion." },
                                        { t: "We are not just vehicle providers", d: "We ensure your comfortable travel." },
                                        { t: "We are not just hotel bookers", d: "We make your rest meaningful." }
                                    ].map((item, idx) => (
                                        <li key={idx} style={{ marginBottom: "15px", display: "flex", alignItems: "flex-start", gap: "15px" }}>
                                            <i className="fas fa-check-circle" style={{ color: "var(--neon-yellow)", marginTop: "5px" }}></i>
                                            <div>
                                                <strong style={{ display: "block", color: "var(--neon-yellow)" }}>{item.t}</strong>
                                                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.d}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{ order: 1 }}>
                                <div style={{ position: "relative" }}>
                                    <img
                                        src="/famous_places/sigiriya.png"
                                        alt="Sigiriya"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            borderRadius: "20px",
                                            border: "2px solid var(--neon-yellow)",
                                            boxShadow: "var(--neon-glow)"
                                        }}
                                    />
                                    <div className="bg-blob" style={{ bottom: "-30px", left: "-30px", width: "200px", height: "200px" }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal" style={{ marginTop: "120px", textAlign: "center", maxWidth: "1000px", margin: "120px auto 0" }}>
                            <h2 style={{ fontSize: "3rem", marginBottom: "40px", color: "var(--neon-yellow)" }}>The Unique Experience</h2>
                            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "rgba(255,255,255,0.9)" }}>
                                Whether it's the historical grandeur of Sigiriya, the misty mountains of Ella, the charm of wild animals in Yala National Park, or the golden sands of the southern coast... wherever it may be, our expert guides are capable of bringing you close to the <strong>"true Sri Lankan identity"</strong> that an ordinary tourist may not see or experience.
                            </p>
                            <p style={{ fontSize: "1.2rem", marginTop: "30px", color: "var(--neon-yellow)", fontWeight: "600" }}>
                                With 15 years of expertise and experience perfected in the field, we will flexibly plan our services to suit your preferences and budget (Customized Tours).
                            </p>
                        </div>

                        <div className="reveal" style={{
                            marginTop: "120px",
                            padding: "80px 40px",
                            background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('/dest_hero_bg.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "30px",
                            textAlign: "center",
                            border: "1px solid var(--neon-yellow)",
                            boxShadow: "var(--neon-glow)"
                        }}>
                            <h2 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>Our Promise</h2>
                            <p style={{ fontSize: "1.5rem", maxWidth: "800px", margin: "0 auto 40px", lineHeight: "1.5" }}>
                                "You come to CHK Ceylon as a tourist. But you return as a member of our family, carrying beautiful memories of Sri Lanka in your heart."
                            </p>
                            <a
                                href="https://wa.me/94776981971"
                                target="_blank"
                                className="btn btn-primary"
                                style={{
                                    padding: "15px 40px",
                                    fontSize: "1.2rem",
                                    background: "var(--neon-yellow)",
                                    color: "#000",
                                    fontWeight: "bold",
                                    borderRadius: "50px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                    transition: "0.3s"
                                }}
                            >
                                Start Your Journey <i className="fab fa-whatsapp" style={{ marginLeft: "10px" }}></i>
                            </a>
                        </div>
                    </div>

                    <div className="reveal" style={{ marginTop: "120px" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center", marginBottom: "60px", color: "var(--neon-yellow)" }}>Our Team</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "60px", alignItems: "start" }}>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/guide.jpeg"
                                        alt="Dilan Lekamarachchi"
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
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>DilanLekamarachchi</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>CEO</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/assistenmanger.jpeg"
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
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}>Finacial Manager</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/touroperator.jpeg"
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
                            <div style={{ textAlign: "center" }}>
                                <div style={{ position: "relative", maxWidth: "250px", margin: "0 auto 30px" }}>
                                    <img
                                        src="/team/NPPUmesha.jpeg"
                                        alt="N.P.P Umesha"
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
                                <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>N.P.P Umesha</h3>
                                <p style={{ fontSize: "1.2rem", color: "var(--neon-yellow)", marginBottom: "20px" }}></p>
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
