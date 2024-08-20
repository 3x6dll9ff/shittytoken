import {useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import userAPI from "../../../global/scripts/user-api.js"
import './css/footer.css';
import {cryptoPath, questsPath, blogPath} from '../../../index.jsx'
import {TelegramSvg, XSvg, DiscordSvg, MailSvg, SupportSvg, UserSvg} from './assets/images/svg/svg_items.jsx'

const TodayUsers = () => {
    const [todayUsers, setTodayUsers] = useState(0);

    const updateOnline = () => {
        userAPI.getOnline()
            .then(response => {
                setTodayUsers(response['count'])
            })
    }

    useEffect(() => {
        const interval = setInterval(updateOnline, 5000);
        return () => clearInterval(interval);
    })

    useEffect(() => {
        updateOnline()
    },[])

    return (
        <div className={'footer-today-users-container'}>
            <p>DAILY ONLINE</p>
            <div className={'footer-social-links footer-user-link'}>
                <UserSvg/>
                <span className="today-users-text">{todayUsers}</span>
            </div>
        </div>
);
}

const Footer = () => {
    const location = useLocation().pathname;
    const links_blacklist = [questsPath]

    for (const link of links_blacklist) {
        if (
            location.includes(`${links_blacklist[link]}/`)
        ) {
            return null;
        }
    }

    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className={'footer-left'}>
                    <div className={'footer-text'}>
                        <div className={'footer-description'}>
                            <span>ANTI-SOCIAL</span> is a platform for enthusiasts of hacking culture and technology.
                            Join our community, participate in exciting quests, and use our bridges and swaps for
                            managing crypto assets.
                            Engage in quests from our partners and earn rewards along the way!
                        </div>
                        <div className={'footer-disclaimer-header'}>
                            DISCLAIMER
                        </div>
                        <div className={'footer-disclaimer'}>
                             Nothing here is financial advice.
                        </div>
                    </div>
                </div>
                <div className={'footer-right'}>
                    <div className={'footer-links'}>
                        <div className={'footer-products-container'}>
                            <p>PRODUCTS</p>
                            <div className={'footer-products-links'}>
                                <Link to={cryptoPath} className={'footer-products-link'}>Crypto</Link>
                                <Link to={questsPath} className={"footer-products-link"}>Quests</Link>
                                <Link to={blogPath} className={"footer-products-link"}>Blog</Link>
                            </div>
                        </div>
                        <div className={'footer-social-container'}>
                            <p>FOLLOW US</p>
                            <div className={'footer-social-links'}>
                                <a href={'https://t.me/anti_social_community'} className={'footer-social-link'}>
                                    <TelegramSvg/>
                                    Telegram
                                </a>
                                <a href={'https://discord.gg/WCnEHUBu5P'} className={"footer-social-link"}>
                                    <DiscordSvg/>
                                    Discord
                                </a>
                                <a href={'https://x.com/AntiSocial_cmty'} className={"footer-social-link"}>
                                    <XSvg/>
                                    Twitter
                                </a>
                            </div>

                        </div>
                        <div className={'footer-contact-container'}>
                            <p>CONTACT US</p>
                            <div className={'footer-contact-links'}>
                                <a href={'mailto:xetokky@gmail.com'} className={'footer-social-link'}>
                                    <MailSvg/>
                                    Email
                                </a>
                                <a href={'https://discord.gg/WCnEHUBu5P'} className={"footer-social-link"}>
                                    <SupportSvg/>
                                    Support
                                </a>
                            </div>

                        </div>
                        <TodayUsers/>
                    </div>
                    <div className={'footer-rights'}>©2024 AntiSocial. All rights reserved.</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;