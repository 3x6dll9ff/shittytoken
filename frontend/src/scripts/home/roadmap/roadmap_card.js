import React from 'react';
import Ellipse from './ellipse';
import '../../../css/home/roadmap.css';

const RoadmapCard = ({ season_number, className, header, text,}) => {
  return (
    <div className={`roadmap-card ${className ? className : ''}`}>
        <div className="roadmap-content">
            <div className={`roadmap-text-container ${className ? className : ''}`}>
                <h2>{header}</h2>
                <p>{text}</p>
            </div>
            <Ellipse season_number={season_number} className={className}/>
        </div>
    </div>
  );
};

export default RoadmapCard;
