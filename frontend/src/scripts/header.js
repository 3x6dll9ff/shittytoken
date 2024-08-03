import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import profile_picture from "../assets/images/placeholder_profile.png";
import profile_icon from "../assets/header/images/profile.png";
import achievement_icon from "../assets/header/images/achievements.png";
import logout_icon from "../assets/header/images/logout.png";

const Header = () => {
    return (
        <div>
            <Ticker />
            <div className={`header`}>
                <Link
                    to={`/`}
                    className={`header-logo`}
                />
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
                </div>
                <div className={`header-data-container`}>
                    <ProfileContainer />
                </div>
            </div>
        </div>
    );
};

const Ticker = () => {
    const speed = 400;
    const [displayedText, setDisplayedText] = useState(
        '* tru3 hack3rs h3r3 * d3finit3ly n0t scam * l3av3 all y0ur data f0r us <3 * big br0th3r watching * war b3tw33n d3vs and hack3rs is 3t3rnal * l3ave all y0ur m0n3y h3r3 * thi5 is th3 w0rk 0f art * w3 ar3 4lway5 a5king f0r pa55w0rds * bitc0in will fall s0m3day '
    );

    useEffect(() => {
        const tick = () => {
            setDisplayedText(prev => prev.slice(1) + prev[0]);
        };

        const interval = setInterval(tick, speed);

        return () => clearInterval(interval);
    }, [displayedText, speed]);

    return (
        <div className={`ticker-container`}>
            <div className={`ticker-text`}>
                {displayedText}
            </div>
        </div>
    );
};

const LinkItem = ({title, url}) => {
    const isActive = useLocation().pathname === url;

    return (
        <Link
            className={`header-menu-item${isActive ? '-active' : ''}`}
            to={url}
        >
            {title}
        </Link>
    );
};

const ProfileContainer = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileExpanded, setProfileExpanded] = useState(false);

    const logoutButton = () => {
        setLoggedIn(false);
        setProfileExpanded(false);
    }

    if (!loggedIn) {
        return(
            <div
                className={`header-wallet-button`}
                onClick={() => setLoggedIn(true)}
            >
                Connect Wallet
            </div>
        );
    }
    else {
        let walletAddress = '0x1234567890abcdef';
        if (walletAddress.length > 13) {
            walletAddress = walletAddress.slice(0, 13) + '...';
        }
        return (
            <div
                className={`header-profile-container ${profileExpanded ? 'expanded' : ''}`}
                onMouseLeave={() => {setProfileExpanded(false)}}
            >
                <div className={`header-profile-info`}>
                    <div className={`header-profile-text-container`}>
                        <div className={`header-profile-username`}>
                            {walletAddress}
                        </div>
                        <div className={`header-profile-wallet-address`}>
                            {walletAddress}
                        </div>
                    </div>
                    <div
                        className={`header-profile-button`}
                        onClick={() => setProfileExpanded(!profileExpanded)}
                    >
                        <div className={`header-profile-picture-bg`}>
                            <img
                                className={`header-profile-picture`}
                                src={profile_picture}
                                alt={`profile-picture`}
                            />
                        </div>
                    </div>
                </div>
                <div className={`header-profile-menu-buttons-container`}>
                    <ProfileButton
                        title={`My profile`}
                        img_src={profile_icon}
                        onClick={`/profile`}
                    />
                    <ProfileButton
                        title={`Achievements`}
                        img_src={achievement_icon}
                    />
                    <div className={`header-profile-menu-separator`}></div>
                    <ProfileButton
                        title={`Logout`}
                        img_src={logout_icon}
                        onClick={logoutButton}
                        alt={true}
                    />
                </div>
            </div>
        );
    }
};

const ProfileButton = ({title, img_src, onClick, alt}) => {
    const link = useLocation().pathname
    let linkTo;
    if (typeof onClick === 'string') {
        linkTo = onClick;
        onClick = () => {
        }
    } else {
        linkTo = link;
    }

    return (
        <Link
            className={`header-profile-menu-button ${alt ? 'alt' : ''}`}
            onClick={onClick}
            to={linkTo}
        >
            <img
                className={`header-profile-menu-button-icon`}
                src={img_src}
                alt={`header-profile-menu-button-icon`}
            />
            <div className={`header-profile-menu-button-text`}>
                {title}
            </div>
        </Link>
    );
};

export default Header;
