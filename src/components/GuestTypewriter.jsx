import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
    collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp
} from 'firebase/firestore';

const GuestTypewriter = () => {
    const [displayed, setDisplayed] = useState('');
    const [latestMsg, setLatestMsg] = useState(null);
    const [input, setInput] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const indexRef = useRef(0);
    const timerRef = useRef(null);

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

    // Typewriter effect when latestMsg loads
    useEffect(() => {
        if (!latestMsg) return;
        indexRef.current = 0;
        setDisplayed('');

        const type = () => {
            if (indexRef.current < latestMsg.text.length) {
                setDisplayed(latestMsg.text.slice(0, indexRef.current + 1));
                indexRef.current++;
                timerRef.current = setTimeout(type, 45);
            }
        };

        timerRef.current = setTimeout(type, 600);
        return () => clearTimeout(timerRef.current);
    }, [latestMsg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        await addDoc(collection(db, 'guestMessages'), {
            text: input.trim(),
            name: name.trim() || 'Anonymous',
            createdAt: serverTimestamp(),
        });

        setSubmitted(true);
        setLatestMsg({ text: input.trim(), from: name.trim() || 'Anonymous' });
        setInput('');
        setName('');
    };

    return (
        <section className="guestbook-section">
            <h2 className="guestbook-title">Leave a word for the next visitor</h2>

            {/* Typewriter display */}
            <div className="typewriter-display">
                {loading ? (
                    <span className="typewriter-placeholder">Loading last message...</span>
                ) : latestMsg ? (
                    <>
                        <span className="typewriter-text">
                            {displayed}
                            <span className="typewriter-cursor">|</span>
                        </span>
                        {displayed.length === latestMsg.text.length && (
                            <span className="typewriter-from">— {latestMsg.from}</span>
                        )}
                    </>
                ) : (
                    <span className="typewriter-placeholder">Be the first to leave a message.</span>
                )}
            </div>

            {/* Input form */}
            {!submitted ? (
                <form className="guestbook-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input guestbook-input"
                        maxLength={40}
                    />
                    <div className="guestbook-textarea-wrap">
                        <textarea
                            placeholder="Type your message for the next visitor..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="form-textarea guestbook-textarea"
                            rows={3}
                            maxLength={200}
                            required
                        />
                        <span className="guestbook-count">{input.length}/200</span>
                    </div>
                    <button type="submit" className="btn-submit" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
                        Pass it on →
                    </button>
                </form>
            ) : (
                <p className="guestbook-thanks">Your message is now waiting for the next visitor. ✦</p>
            )}
        </section>
    );
};

export default GuestTypewriter;
