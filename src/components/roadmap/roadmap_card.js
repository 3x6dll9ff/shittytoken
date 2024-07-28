// src/components/BackgroundVideo.js
import React from 'react';
import '../../css/roadmap.css';
import Ellipse from './ellipse';

const RoadmapCard = ({quarter, year, className, header, text,}) => {
  return (
    <div className={`roadmap-card ${className ? className : ''}`}>
        <div className="roadmap-content">
            <div className={`roadmap-text-container ${className ? className : ''}`}>
                <h2>{header}</h2>
                <p>{text}</p>
            </div>
            <Ellipse quarter={quarter} year={year} className={className}/>
        </div>
    </div>
  );
};

export default RoadmapCard;
