import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '4rem 1rem 8rem 1rem',
            color: '#888',
            fontSize: '0.9rem',
            marginTop: 'auto', // Pushes footer naturally to bottom of flex if used
            borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
            <p>© {new Date().getFullYear()} Pang Lang. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
