import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Typewriter.css';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

const ROWS = [
    ['1','2','3','4','5','6','7','8','9','0','-','←'],
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L',';',"'"],
    ['⇧','Z','X','C','V','B','N','M',',','.','/','⇧'],
];

const GuestTypewriter = () => {
    const [text, setText] = useState('');
    const [pressedKey, setPressedKey] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const [latestMsg, setLatestMsg] = useState(null);
    const [displayed, setDisplayed] = useState('');
    const [loading, setLoading] = useState(true);
    const [envelopeOpen, setEnvelopeOpen] = useState(false);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const indexRef = useRef(0);
    const timerRef = useRef(null);
    const MAX = 120;

    // Fetch the latest message on mount
    useEffect(() => {
        const fetch = async () => {
            const q = query(collection(db, 'guestMessages'), orderBy('createdAt', 'desc'), limit(1));
            const snap = await getDocs(q);
            if (!snap.empty) {
                const data = snap.docs[0].data();
                setLatestMsg({ text: data.text, from: data.name });
            }
            setLoading(false);
        };
        fetch();
    }, []);

    // Typewriter effect when latestMsg loads and envelope opens
    useEffect(() => {
        if (!latestMsg || !envelopeOpen) return;
        indexRef.current = 0;
        setDisplayed('');

        const type = () => {
            if (indexRef.current < latestMsg.text.length) {
                setDisplayed(latestMsg.text.slice(0, indexRef.current + 1));
                indexRef.current++;
                timerRef.current = setTimeout(type, 45);
            }
        };

        timerRef.current = setTimeout(type, 800);
        return () => clearTimeout(timerRef.current);
    }, [latestMsg, envelopeOpen]);

    const handleEnvelopeClick = () => {
        setEnvelopeOpen(true);
        // Show typewriter after envelope animation completes (increased delay)
        setTimeout(() => setShowTypewriter(true), 5000);
    };

    const pressKey = useCallback((key) => {
        if (submitted) return;
        setPressedKey(key);
        setTimeout(() => setPressedKey(null), 120);

        if (key === '←') {
            setText(t => t.slice(0, -1));
        } else if (key === 'SPACE') {
            setText(t => t.length < MAX ? t + ' ' : t);
        } else if (key === '⇧') {
            // shift — no-op for now
        } else {
            setText(t => t.length < MAX ? t + key : t);
        }
    }, [submitted]);

    // Physical keyboard support
    useEffect(() => {
        if (!showTypewriter) return;
        const handler = (e) => {
            if (e.key === 'Backspace') { pressKey('←'); return; }
            if (e.key === ' ') { e.preventDefault(); pressKey('SPACE'); return; }
            if (e.key.length === 1) pressKey(e.key.toUpperCase());
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [pressKey, showTypewriter]);

    const handleSend = async () => {
        if (!text.trim()) return;
        await addDoc(collection(db, 'guestMessages'), {
            text: text.trim(),
            name: name.trim() || 'Anonymous',
            createdAt: serverTimestamp(),
        });
        setSubmitted(true);
        setShowNamePrompt(false);
    };

    if (loading) {
        return (
            <div className="tw-wrapper">
                <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                    Loading...
                </div>
            </div>
        );
    }

    // Show envelope if there's a message and it hasn't been opened yet
    if (latestMsg && !showTypewriter) {
        return (
            <div className="tw-wrapper">
                <div className="envelope-container">
                    <div 
                        className={`envelope-wrapper ${envelopeOpen ? 'envelope-wrapper--open' : ''}`}
                        onClick={!envelopeOpen ? handleEnvelopeClick : undefined}
                    >
                        {/* Dual lids */}
                        <div className="envelope-lid one"></div>
                        <div className="envelope-lid two"></div>
                        
                        {/* Envelope body */}
                        <div className="envelope-body"></div>

                        {/* Letter inside */}
                        <div className="envelope-letter">
                            <div className="letter-content">
                                <p>"{displayed}"</p>
                                {displayed.length === latestMsg.text.length && (
                                    <p>— {latestMsg.from}</p>
                                )}
                            </div>
                        </div>

                        {/* Label on closed envelope */}
                        {!envelopeOpen && (
                            <div className="envelope-label">
                                <span>✉️</span>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>Click to open</p>
                            </div>
                        )}
                    </div>
                    {!envelopeOpen && (
                        <p className="envelope-hint">
                            A message from the previous visitor
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="tw-wrapper">
            {/* Machine body */}
            <div className="tw-machine">

                {/* Paper + display */}
                <div className="tw-paper-section">
                    <div className="tw-roller-bar" />
                    <div className="tw-paper">
                        <div className="tw-paper-lines">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="tw-line" />
                            ))}
                        </div>
                        <div className="tw-typed-text">
                            {submitted ? (
                                <span className="tw-sent">✦ Passed on to the next visitor</span>
                            ) : (
                                <>
                                    {text}
                                    <span className="tw-caret">|</span>
                                </>
                            )}
                        </div>
                        <div className="tw-char-count">{text.length}/{MAX}</div>
                    </div>
                    <div className="tw-roller-bar" />
                </div>

                {/* Keyboard */}
                <div className="tw-keyboard">
                    {ROWS.map((row, ri) => (
                        <div key={ri} className="tw-row">
                            {row.map((key) => (
                                <button
                                    key={key}
                                    className={`tw-key ${pressedKey === key ? 'tw-key--pressed' : ''} ${key === '⇧' ? 'tw-key--wide' : ''} ${key === '←' ? 'tw-key--wide' : ''}`}
                                    onMouseDown={() => pressKey(key)}
                                    aria-label={key}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    ))}
                    <div className="tw-row">
                        <button
                            className={`tw-key tw-key--space ${pressedKey === 'SPACE' ? 'tw-key--pressed' : ''}`}
                            onMouseDown={() => pressKey('SPACE')}
                        >
                            SPACE
                        </button>
                    </div>

                    {/* Send row */}
                    {!submitted && (
                        <div className="tw-send-row">
                            {!showNamePrompt ? (
                                <button className="tw-send-btn" onClick={() => text.trim() && setShowNamePrompt(true)}>
                                    Pass it on →
                                </button>
                            ) : (
                                <div className="tw-name-prompt">
                                    <input
                                        className="tw-name-input"
                                        placeholder="Your name (optional)"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        maxLength={40}
                                        autoFocus
                                    />
                                    <button className="tw-send-btn" onClick={handleSend}>Send ✦</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuestTypewriter;
