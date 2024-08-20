import {useLocation} from "react-router-dom";
import {questsPath} from "../../../index.jsx";

import './css/footer.css';


const Footer = () => {
    const location = useLocation().pathname;
    const links_blacklist = [questsPath]

    for (const link in links_blacklist) {
        if (
            location.includes(`${links_blacklist[link]}/`)
        ) {
            return null;
        }
    }

    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <p className='disclaimer-header'>DISCLAIMER</p>
                <p className='disclaimer-description'>Investing in 'ANTI-SOCIAL' is risky and may lead to loss of
                    capital. Nothing here is financial advice.</p>
                <p className='disclaimer-rights'>© 2024 ANTI-SOCIAL. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;