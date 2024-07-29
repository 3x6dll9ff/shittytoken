// src/components/BackgroundVideo.js
import React from 'react';
import '../../css/stuff.css';

const Card = ({name, image}) => {
  return (
    <div className="card-container">
        <div className='stuff-card'>
            <div className='card-image-container'>
              <img className="card-image" src={image} alt="CardImage" />
            </div>
            <div className='card-name'>
                <p>{name}</p>
            </div>
        </div>
    </div>
  );
};

export default Card;
