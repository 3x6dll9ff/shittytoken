import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import logo_default_small from "../assets/images/logo_small.png";
import logo_hover_small from "../assets/images/logo_hover_small.png";

const Header = () => {
    return (
        <div>
            <Ticker
                text={`* tru3 hack3rs h3r3 * d3finit3ly n0t scam * l3av3 all y0ur data f0r us <3 * big broth3r watching * war b3tw33n d3vs and hack3rs is 3t3rnal * l3ave all y0ur m0n3y h3r3 * this is th3 w0rk 0f art * w3 ar3 4lway5 a5king f0r pa55w0rds * bitc0in will fall s0m3day `}
                speed={400}
            />
            <div className={`header`}>
                <Logo />
                <div className={`header-menu-items-container`}>
                    <LinkItem
                        title={`HOME`}
                        url={`/`}
                    />
                    <LinkItem
                        title={`CRYPTO`}
                        url={`/crypto`}
                    />
                    <LinkItem
                        title={`QUESTS`}
                        url={`/quests`}
                    />
                    <LinkItem
                        title={`BLOG`}
                        url={`/blog`}
                    />
                    <LinkItem
                        title={`PROFILE`}
                        url={`/profile`}
                    />
                </div>
            </div>
        </div>
    );
};

const Logo = () => {
    const [logo, setLogo] = useState(logo_default_small);

    const mouseEnter = () => {
        setLogo(logo_hover_small);
    }

    const mouseLeave = () => {
        setLogo(logo_default_small);
    }

    return (
        <Link
            to={`/`}
            className={`logo`}
        >
            <img
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
                src={logo}
                alt={`site-logo`}
            />
        </Link>
    );
};

const LinkItem = ({title, url}) => {
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const isActive = location.pathname === url;

    let condition = '';
    if (isHovered) {
        condition = 'hovered';
    }
    if (isActive) {
        condition = 'active';
    }

    return (
        <Link
            className={`header-menu-item ${condition}`}
            to={url}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {title}
        </Link>
    );
};

const Ticker = ({ text, speed }) => {
    const [displayedText, setDisplayedText] = useState(text);

    useEffect(() => {
        const tick = () => {
            setDisplayedText(prev => prev.slice(1) + prev[0]);
        };

        const interval = setInterval(tick, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return (
        <div className={`ticker-container`}>
            <div className={`ticker-text`}>
                {displayedText}
            </div>
        </div>
    );
};

export default Header;
