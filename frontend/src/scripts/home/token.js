import React from 'react';
import '../../css/home/token.css';
import token_picture from '../../assets/home/images/token.png'

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
