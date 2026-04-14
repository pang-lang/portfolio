import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, subtitle, description, isLast }) => {
    return (
        <div className="timeline-item">
            <div className="timeline-content">
                <h3 className="timeline-title">{title}</h3>
                {subtitle && <p className="timeline-subtitle">{subtitle}</p>}
                {description && <p className="timeline-description">{description}</p>}
            </div>
            <div className="timeline-separator">
                <div className="timeline-dot"></div>
                {!isLast && <div className="timeline-line-vertical"></div>}
            </div>
            <div className="timeline-year">
                {year && <span className="year-text">{year}</span>}
            </div>
        </div>
    );
};

const Timeline = ({ items, alignLeft }) => {
    return (
        <div className={`timeline-container ${alignLeft ? 'timeline-left-align' : ''}`}>
            {items.map((item, index) => (
                <TimelineItem
                    key={index}
                    {...item}
                    isLast={index === items.length - 1}
                />
            ))}
        </div>
    );
};

export default Timeline;
