import React from 'react';
import '../css/footer.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <p className='disclaimer-header'>DISCLAIMER</p>
                <p className='disclaimer-description'>Investing in 'XXX' is risky and may lead to loss of capital. Nothing here is financial advice. This is a meme coin.</p>
                <p className='disclaimer-rights'>© 2024 XXX. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;