import React, { useState } from 'react';
import { Youtube, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const travelData = [
    {
        country: 'Japan',
        photos: [
            '/assets/travel/japan/1.webp',
            '/assets/travel/japan/2.webp',
            '/assets/travel/japan/3.webp',
            '/assets/travel/japan/4.webp',
            '/assets/travel/japan/5.webp',
            '/assets/travel/japan/6.webp',
            '/assets/travel/japan/7.webp',
            '/assets/travel/japan/8.webp',
            '/assets/travel/japan/9.webp',
            '/assets/travel/japan/10.webp',
        ]
    },
    {
        country: 'South Korea',
        photos: [
            '/assets/travel/korea/1.webp',
            '/assets/travel/korea/2.webp',
            '/assets/travel/korea/3.webp',
            '/assets/travel/korea/4.webp',
            '/assets/travel/korea/5.webp',
            '/assets/travel/korea/6.webp',
            '/assets/travel/korea/7.webp',
            '/assets/travel/korea/8.webp',
        ]
    },
    {
        country: 'Australia',
        photos: [
            '/assets/travel/australia/1.webp',
            '/assets/travel/australia/2.webp',
            '/assets/travel/australia/3.webp',
            '/assets/travel/australia/4.webp',
            '/assets/travel/australia/5.webp',
            '/assets/travel/australia/6.webp',
            '/assets/travel/australia/7.webp',
            '/assets/travel/australia/8.webp',
            '/assets/travel/australia/9.webp',
            '/assets/travel/australia/10.webp',
            '/assets/travel/australia/11.webp',
            '/assets/travel/australia/12.webp',
            '/assets/travel/australia/13.webp',
            '/assets/travel/australia/14.webp',
        ]
    },
    {
        country: 'China',
        photos: [
            '/assets/travel/china/1.webp',
            '/assets/travel/china/2.webp',
            '/assets/travel/china/3.webp',
            '/assets/travel/china/4.webp',
            '/assets/travel/china/5.webp',
            '/assets/travel/china/6.webp',
            '/assets/travel/china/7.webp',
            '/assets/travel/china/8.webp',
            '/assets/travel/china/9.webp',
            '/assets/travel/china/10.webp',
            '/assets/travel/china/11.webp',
        ]
    },
    {
        country: 'Taiwan',
        photos: [
            '/assets/travel/taiwan/1.webp',
            '/assets/travel/taiwan/2.webp',
            '/assets/travel/taiwan/3.webp',
            '/assets/travel/taiwan/4.webp',
            '/assets/travel/taiwan/5.webp',
            '/assets/travel/taiwan/6.webp',
        ]
    }
];

const TravelCarousel = ({ photos }) => {
    const [active, setActive] = useState(0);

    const prev = () => setActive(i => (i - 1 + photos.length) % photos.length);
    const next = () => setActive(i => (i + 1) % photos.length);

    // positions: left-far, left, center, right, right-far
    const getStyle = (idx) => {
        const total = photos.length;
        let offset = idx - active;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        if (absOffset > 2) return { display: 'none' };

        const configs = {
            0:  { x: '0%',    scale: 1,    z: 5, opacity: 1    },
            1:  { x: '52%',   scale: 0.82, z: 4, opacity: 0.85 },
            '-1':{ x: '-52%', scale: 0.82, z: 4, opacity: 0.85 },
            2:  { x: '90%',   scale: 0.65, z: 3, opacity: 0.5  },
            '-2':{ x: '-90%', scale: 0.65, z: 3, opacity: 0.5  },
        };

        const c = configs[offset] || configs[0];
        return {
            position: 'absolute',
            transform: `translateX(${c.x}) scale(${c.scale})`,
            zIndex: c.z,
            opacity: c.opacity,
            transition: 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
            cursor: offset !== 0 ? 'pointer' : 'default',
        };
    };

    return (
        <div className="travel-carousel-wrap">
            <div className="travel-carousel-stage">
                {photos.map((src, idx) => (
                    <div
                        key={idx}
                        style={getStyle(idx)}
                        onClick={() => setActive(idx)}
                    >
                        <img
                            src={src}
                            alt={`Travel photo ${idx + 1}`}
                            className="travel-carousel-img"
                        />
                    </div>
                ))}
            </div>
            <div className="travel-carousel-nav">
                <button className="travel-nav-btn" onClick={prev}><ChevronLeft size={20} /></button>
                <button className="travel-nav-btn" onClick={next}><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

const Others = () => {
    const titleRef = useScrollReveal();
    const travelRef = useScrollReveal();
    const contentRef = useScrollReveal();
    const playlistRef = useScrollReveal();

    const [selectedCountry, setSelectedCountry] = useState(travelData[0].country);
    const current = travelData.find(t => t.country === selectedCountry);

    return (
        <div className="others-page container">
            <h1 ref={titleRef} className="section-title reveal" style={{ marginTop: '2rem', marginBottom: '6rem' }}>
                <strong>What I am up to</strong>
            </h1>

            {/* Travel Section */}
            <section ref={travelRef} className="travel-section reveal" style={{ marginBottom: '8rem' }}>
                <h2 className="subsection-title">Travel</h2>

                {/* Country pills */}
                <div className="travel-country-pills">
                    {travelData.map(t => (
                        <button
                            key={t.country}
                            className={`travel-pill ${selectedCountry === t.country ? 'travel-pill--active' : ''}`}
                            onClick={() => setSelectedCountry(t.country)}
                        >
                            {t.country}
                        </button>
                    ))}
                </div>

                {/* Carousel */}
                <TravelCarousel key={selectedCountry} photos={current.photos} />
            </section>

            {/* Content Creation Section */}
            <section ref={contentRef} className="content-creator-section reveal" style={{ marginBottom: '8rem' }}>
                <h2 className="subsection-title">Content Creation</h2>
                <div className="content-grid">

                    <div className="content-card youtube-card">
                        <div className="content-icon yt-icon"><Youtube size={56} strokeWidth={1.5} /></div>
                        <h3>YouTube</h3>
                        <p>Sharing my studies, travel adventures, and lifestyle based in Malaysia.</p>
                        <a href="https://www.youtube.com/@plkueh04" className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                            Visit Channel
                        </a>
                    </div>

                    <div className="content-card red-card">
                        <div className="content-icon red-icon">
                            <span style={{ fontSize: '2.5rem', fontWeight: 900, fontStyle: 'italic', lineHeight: 1 }}>RED</span>
                        </div>
                        <h3>Xiao Hong Shu</h3>
                        <p>Documenting my study and life insights.</p>
                        <a href="https://www.xiaohongshu.com/user/profile/623e5948000000001000c12c?xhsshare=CopyLink&appuid=623e5948000000001000c12c&apptime=1724469575&share_id=3529bba51c7a4d1d8ca7f72281527091" className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                            Visit Profile
                        </a>
                    </div>

                </div>
            </section>

            {/* Playlist Section */}
            <section ref={playlistRef} className="playlist-section reveal" style={{ marginBottom: '8rem' }}>
                <h2 className="subsection-title">My Playlist</h2>
                <div className="playlist-card">
                    <div className="cd-container">
                        <div className="cd-grooves"></div>
                        <div className="cd-center"></div>
                    </div>
                    <div className="playlist-info">
                        <h3>Vibes & Focus</h3>
                        <p>A curated collection of my favorite tracks. Perfect for coding sessions, late-night study, or just chilling out.</p>
                        <a
                            href="https://music.youtube.com/playlist?list=PLnRvhN2Pgy9lsFtca5KO4hQUn4V9mOPjW&si=-D6aY_BWYg3bJn1I"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Music size={18} /> Listen on YT Music
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Others;
