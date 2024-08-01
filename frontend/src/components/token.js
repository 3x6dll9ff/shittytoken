// src/components/BackgroundVideo.js
import React from 'react';
import '../css/token.css'; // Подключаем стили
import token_picture from '../assets/images/token.png'

const Token = () => {
  return (
    <div className="token-container">
        <img className="token-image" src={token_picture} alt="Token" />
        <p className='token-name'>TOKENNAME</p>
        <p className='token-description'>Lorem ipsum dolor sit amet</p>
    </div>
  );
};

export default Token;
