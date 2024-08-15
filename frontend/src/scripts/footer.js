import React from 'react';
import { useLocation } from "react-router-dom";
import { questPath } from "../index";
import '../css/footer.css';

const Footer = () => {
    const location = useLocation().pathname;
    const links_blacklist = [questPath]

    for (const link in links_blacklist) {
        if (location.includes(`${links_blacklist[link]}/`)) { return null; }
    }

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