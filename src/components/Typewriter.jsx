import React, { useState, useEffect, useCallback } from 'react';
import './Typewriter.css';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

const ROWS = [
    ['1','2','3','4','5','6','7','8','9','0','-','←'],
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L',';',"'"],
    ['⇧','Z','X','C','V','B','N','M',',','.','/','⇧'],
];

const Typewriter = () => {
    const [text, setText] = useState('');
    const [pressedKey, setPressedKey] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [showNamePrompt, setShowNamePrompt] = useState(false);
    const MAX = 120;

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
        const handler = (e) => {
            if (e.key === 'Backspace') { pressKey('←'); return; }
            if (e.key === ' ') { e.preventDefault(); pressKey('SPACE'); return; }
            if (e.key.length === 1) pressKey(e.key.toUpperCase());
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [pressKey]);

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

export default Typewriter;
