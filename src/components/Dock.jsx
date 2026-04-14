import React from 'react';
import './Dock.css';

export default function Dock({ items, className = '' }) {
    return (
        <div className={`dock-outer`}>
            <div className={`dock-panel ${className}`} role="toolbar" aria-label="Application dock">
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        className={`dock-item ${item.className || ''}`}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="dock-icon">
                            {item.icon}
                        </div>
                        <div className="dock-label">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
