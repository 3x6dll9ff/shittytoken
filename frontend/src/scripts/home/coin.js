import React from 'react';
import '../../css/home/coin.css';
import coin_gif from '../../assets/home/images/coin.gif';

const Coin = () => {
    return (
        <div className="token-container">
            <img
                className="token-image"
                src={coin_gif}
                alt="Token"
            />
            <p className='token-name'>ANTI-SOCIAL</p>
            <p className='token-description'>C0in that n3v3r sl33ps</p>
        </div>
    );
};

export default Coin;
