import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import sheImg from '../assets/she.png';
import Lanyard from '../components/Lanyard';
import TextType from '../components/TextType';

const About = () => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const backgroundItems = [
        { char: 'P', top: '15%', left: '10%', rotate: 15, fontSize: '18vw', zIndex: 1 },
        { char: 'o', top: '30%', left: '24%', rotate: -10, fontSize: '14vw', zIndex: 0 },
        { char: 'R', top: '0%', left: '30%', rotate: -5, fontSize: '16vw', zIndex: 2 },
        { char: 'T', top: '-15%', left: '44%', rotate: 0, fontSize: '18vw', zIndex: -1 },
        { char: 'f', top: '5%', left: '58%', rotate: 12, fontSize: '14vw', zIndex: 2 },
        { char: 'O', top: '22%', left: '62%', rotate: 0, fontSize: '13vw', zIndex: 1 },
        { char: 'L', top: '12%', left: '76%', rotate: -5, fontSize: '15vw', zIndex: 2 },
        { char: 'i', top: '35%', left: '87%', rotate: 15, fontSize: '12vw', zIndex: 0 },
        { char: 'o', top: '45%', left: '92%', rotate: 0, fontSize: '8vw', zIndex: 1 },
        { char: "'26", top: '10%', left: '68%', rotate: 10, fontSize: '5vw', zIndex: 3, color: '#426BC2' }
    ];

    const floatingVariants = {
        animate: (item) => ({
            y: [0, -10, 0],
            x: [0, Math.random() * 6 - 3, 0],
            rotate: [item.rotate, item.rotate + 2, item.rotate],
            transition: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random()
            }
        })
    };

    const eduItems = [
        {
            year: 'Oct 2023 - Dec 2027',
            title: 'Universiti Malaya, Malaysia',
            description: <>Bachelor of Computer Science (Data Science)<br />CGPA 3.85</>
        },
        {
            year: 'Apr 2026 - Sep 2026',
            title: 'Technical University of Munich, Germany',
            description: <>Bachelor of Science (Informatics)<br />Exchange Student</>
        }
    ];

    const expItems = [
        {
            year: 'Jul 2025 - Sep 2025',
            title: 'Cyber Village Sdn. Bhd.',
            subtitle: 'Business Analyst Intern',
            description: (
                <ul style={{ paddingLeft: '1rem', margin: 0, listStylePosition: 'outside', display: 'inline-block', textAlign: 'left' }}>
                    <li style={{ marginBottom: '0.4rem' }}>Gathered and analysed client business requirements for the Secure Personal Financing release through workshops and stakeholder discussions, ensuring alignment on proposed solutions.</li>
                    <li>Prepared mock screens, functional specifications documents and process flow diagrams to support application submission, background check and onboarding process development.</li>
                </ul>
            )
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section" style={{ minHeight: '65vh', position: 'relative' }}>
                <div className="portfolio-text-bg">
                    {backgroundItems.map((item, i) => {
                        const letterRef = React.useRef(null);
                        const [distance, setDistance] = React.useState(1000);

                        React.useEffect(() => {
                            if (letterRef.current) {
                                const rect = letterRef.current.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const centerY = rect.top + rect.height / 2;
                                const dist = Math.sqrt(
                                    Math.pow(mousePos.x - centerX, 2) + 
                                    Math.pow(mousePos.y - centerY, 2)
                                );
                                setDistance(dist);
                            }
                        }, [mousePos]);

                        const maxDistance = 200;
                        const opacity = Math.max(0, 1 - distance / maxDistance);
                        const revealColor = item.color || '#426BC2';
                        const baseColor = '#000000';
                        
                        // Interpolate between black and blue based on proximity
                        const r = Math.round(0 + (66 - 0) * opacity);
                        const g = Math.round(0 + (107 - 0) * opacity);
                        const b = Math.round(0 + (194 - 0) * opacity);
                        const currentColor = `rgb(${r}, ${g}, ${b})`;

                        return (
                            <motion.span
                                key={i}
                                ref={letterRef}
                                custom={item}
                                variants={floatingVariants}
                                animate="animate"
                                className="floating-letter"
                                style={{
                                    position: 'absolute',
                                    top: item.top,
                                    left: item.left,
                                    fontSize: item.fontSize,
                                    color: item.color || currentColor,
                                    zIndex: item.zIndex,
                                    fontWeight: 900,
                                    transformOrigin: 'center',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                {item.char}
                            </motion.span>
                        );
                    })}

                    <div style={{ position: 'absolute', top: '65%', left: '10%', color: '#426BC2', fontWeight: 900, fontSize: '2.5vw', lineHeight: 1.2, fontFamily: "'Inter', sans-serif" }}>
                        Pang Lang
                        
                    </div>
                    <div style={{ position: 'absolute', top: '72%', left: '10%', color: '#426BC2', fontWeight: 900, fontSize: '2.5vw', lineHeight: 1.2, fontFamily: "'Inter', sans-serif"}}>
                        Kueh 
                    </div>
                    <div style={{ position: 'absolute', top: '0%', right: '5%', fontSize: '0.9vw', color: '#666', textAlign: 'right', fontWeight: 600 }}>
                        Universiti Malaya<br />Data Science
                    </div>
                </div>

                <div className="hero-image-container" style={{ zIndex: 10, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <img src={sheImg} className="hero-img" style={{ maxWidth: '700px', width: '100%', objectFit: 'contain', marginTop: '10rem' }} />
                </div>
            </section>

            {/* Intro Section */}
            <section className="intro-section" style={{ position: 'relative' }}>
                <motion.div
                    className="intro-content"
                    style={{ position: 'relative', zIndex: 8 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="intro-heading">
                        <TextType as="span" text="Hello I'm " showCursor={false} typingSpeed={60} loop={false} />
                        <strong>
                            <TextType as="span" text="Pang Lang 湘兰！" initialDelay={1200} cursorCharacter="_" typingSpeed={100} loop={true} />
                        </strong>
                    </h1>
                    <h1 className="intro"><strong style={{ color: 'var(--accent-color)' }}>Data Science Student</strong> </h1>
                    <p className="intro-text">
                        I’ve always been drawn to where logic meets creativity which led me to building digital experiences.
                        I like turning ideas into simple, functional solutions while valuing the process just as much as the outcome.
                    </p>
                    <div className="social-links" style={{ position: 'relative', zIndex: 20 }}>
                        <a href="https://github.com/pang-lang" className="social-icon"><Github size={20} /></a>
                        <a href="https://my.linkedin.com/in/panglang" className="social-icon"><Linkedin size={20} /></a>
                        <a href="mailto:plkueh04@gmail.com" className="social-icon"><Mail size={20} /></a>
                    </div>
                </motion.div>

                {/* Flex placeholder so the text is pushed natively to the left side */}
                <div style={{ flex: 1, display: 'flex' }} />

                <div className="intro-image" style={{ position: 'absolute', top: '50%', right: '-15vw', transform: 'translateY(-50%)', width: '70vw', cursor: 'grab', zIndex: 10 }}>
                    <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} />
                </div>
            </section>

            {/* Timeline Section */}
            <div className="timeline-section-wrapper">
                <motion.section
                    className="timeline-section"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{ marginBottom: '4rem'}}
                >
                    <h2 className="section-title-projects"><strong>Experience</strong></h2>
                    <div className="timeline-wrapper">
                        <Timeline items={expItems} alignLeft={true} />
                    </div>
                    
                    {/* Seeking opportunities section */}
                    <div style={{ 
                        marginTop: '3rem', 
                        padding: '2rem', 
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <p style={{ 
                            fontSize: '1.1rem', 
                            color: 'var(--text-color)',
                            fontWeight: 500,
                            margin: 0
                        }}>
                            🚀 Currently seeking for internship opportunities in Data, AI, or Machine Learning.
                        </p>
                        <a 
                            href="/resume.pdf" 
                            download 
                            className="btn-primary"
                            style={{ textDecoration: 'none' }}
                        >
                            Download Resume
                        </a>
                    </div>
                </motion.section>

                <motion.section
                    className="timeline-section"
                    style={{ marginBottom: '5rem' }}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-title-projects"><strong>Education</strong></h2>
                    <div className="timeline-wrapper">
                        <Timeline items={eduItems} />
                    </div>
                </motion.section>
            </div>
        </div>
    );
};

export default About;
