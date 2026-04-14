import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import GuestTypewriter from '../components/Typewriter';

const Contacts = () => {
    const [formData, setFormData] = useState({ name: '', email: '', website: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, website, message } = formData;

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nWebsite: ${website}\n\nMessage:\n${message}`);

        window.location.href = `mailto:plkueh04@gmail.com?subject=${subject}&body=${body}`;

        setFormData({ name: '', email: '', website: '', message: '' });
    };
    const formRef = useScrollReveal();
    const textRef = useScrollReveal();

    return (
        <div className="contacts-page container">
            <div className="guestbook-section">
                <h2 className="guestbook-title">Leave a word for the next visitor</h2>
                <GuestTypewriter/>
            </div>

            <div className="contacts-split">
                {/* Left Side: Form */}
                <div ref={formRef} className="contacts-form-section reveal">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your name" className="form-input" required />
                        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="form-input" required />
                        <input name="website" value={formData.website} onChange={handleChange} type="text" placeholder="Your website (If exists)" className="form-input" />
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can I help?*" className="form-textarea" rows="4" required></textarea>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit" style={{ cursor: 'pointer' }}>Get In Touch</button>
                            <div className="social-squares">
                                <a href="https://github.com/pang-lang" target="_blank" rel="noopener noreferrer" className="social-square"><Github size={20} /></a>
                                <a href="https://my.linkedin.com/in/panglang" target="_blank" rel="noopener noreferrer" className="social-square"><Linkedin size={20} /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-square"><Twitter size={20} /></a>
                                <a href="mailto:plkueh04@gmail.com" className="social-square"><Mail size={20} /></a>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Side: Text */}
                <div ref={textRef} className="contacts-text-section reveal" style={{ transitionDelay: '0.15s' }}>
                    <h1 className="contacts-heading">
                        Let's talk for<br />
                        something special
                    </h1>
                    
                    <p className="contacts-description">
                        I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Contacts;
