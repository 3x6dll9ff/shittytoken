import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { connectWallet } from "./wallet_connect";
import { formatWalletAddress } from "./utils"
import "../css/header.css";
import header_logo_back from "../assets/header/images/header-logo-back.png";
import header_logo_middle from "../assets/header/images/header-logo-middle.png";
import header_logo_front from "../assets/header/images/header-logo-front.png";
import header_logo_hover from "../assets/header/images/header-logo-hover.png";
import pixel_mask from "../assets/header/images/pixel-mask.png";
import profile_picture from "../assets/images/placeholder-profile.png";
import profile_icon from "../assets/header/images/profile.png";
import achievement_icon from "../assets/header/images/achievements.png";
import logout_icon from "../assets/header/images/logout.png";

const Header = ({clientCursorCoordinates}) => {
    const x = clientCursorCoordinates.x;
    const y = clientCursorCoordinates.y;

    return (
        <div>
            <Ticker />
            <div className={`header`}>
                <div className={`header-pixel-mask-container`}>
                    <img
                        className={`header-pixel-mask-image`}
                        src={pixel_mask}
                        alt={`pixel mask`}
                    />
                    <div
                        className={`header-pixel-mask`}
                        style={{background: `radial-gradient(circle at ${x}px ${y}px, transparent 0%, rgba(0, 0, 0, 1) 150px)`}}
                    />
                </div>
                <Logo clientCursorCoordinates={clientCursorCoordinates} />
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
    const text = '* tru3 hack3rs h3r3 * d3finit3ly n0t scam * l3av3 all y0ur data f0r us <3 * sh4d0ws alway5 w4tching * big br0th3r watch1ng * th3 cyb3r c0nflict 1s 3t3rnal * l3ave all y0ur m0n3y h3r3 * thi5 is th3 w0rk 0f art * w3 ar3 4lway5 a5king f0r pa55w0rds * bitc0in will fall s0m3day * wh3r3 th3 s3cur1ty g0e5, w3 f0ll0w * g0v3rnm3nt n3v3r sl33ps '
    const speed = 400;
    const [displayedText, setDisplayedText] = useState(text.repeat(3));

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

const Logo = ({ clientCursorCoordinates }) => {
    const [moddedCoordinates, setModdedCoordinates] = useState({ x: 0, y: 0 });
    const [isHovered, setHovered] = useState(false);
    const middlePhotoRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    useEffect(() => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const moddedX = clientCursorCoordinates.x - containerRect.left;
            const moddedY = clientCursorCoordinates.y - containerRect.top;
            setModdedCoordinates({ x: moddedX, y: moddedY });
        }
    }, [clientCursorCoordinates]);

    useEffect(() => {
        if (middlePhotoRef.current && containerRef.current) {
            const middlePhotoRect = middlePhotoRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const middlePhotoX = Math.min(
                Math.max(moddedCoordinates.x - middlePhotoRect.width / 2, 0),
                containerRect.width - middlePhotoRect.width
            );
            const middlePhotoY = Math.min(
                Math.max(moddedCoordinates.y - middlePhotoRect.height / 2, 0),
                containerRect.height - middlePhotoRect.height
            );

            middlePhotoRef.current.style.transform = `translate(${middlePhotoX}px, ${middlePhotoY}px)`;
        }
    }, [moddedCoordinates]);

    return (
        <Link
            className="header-logo-container"
            ref={containerRef}
            to="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered ? (
                <img
                    className="header-logo"
                    src={header_logo_hover}
                    alt="logo"
                />
            ) : (
                <div>
                    <div className="header-logo back">
                        <img
                            src={header_logo_back}
                            alt="logo"
                        />
                    </div>
                    <div className="header-logo middle" ref={middlePhotoRef}>
                        <img
                            src={header_logo_middle}
                            alt="logo"
                        />
                    </div>
                    <div className="header-logo front">
                        <img
                            src={header_logo_front}
                            alt="logo"
                        />
                    </div>
                </div>
            )}
        </Link>
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
    const [userAccount, setUserAccount] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileExpanded, setProfileExpanded] = useState(false);
    const containerRef = useRef(null);

    const handleConnectButton = async () => {
        await connectWallet(account => {
            setUserAccount(account)
            setLoggedIn(true)
        });
    }

    const handleLogoutButton = () => {
        setLoggedIn(false);
        setProfileExpanded(false);
    };

    const preventScroll = (event) => {
        event.preventDefault();
    };

    const handlePointerEnter = () => {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', preventScroll, { passive: false });
        }
    };

    const handlePointerLeave = () => {
        if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', preventScroll);
        }
        setProfileExpanded(false);
    };

    useEffect(() => {
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', preventScroll);
            }
        };
    }, []);

    if (!loggedIn) {
        return (
            <div
                className={`header-wallet-button`}
                onClick={handleConnectButton}
            >
                Connect Wallet
            </div>
        );
    }
    else {
        return (
            <div
                className={`header-profile-container ${profileExpanded ? 'expanded' : ''}`}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                ref={containerRef}
            >
                <div className={`header-profile-info`}>
                    <div className={`header-profile-text-container`}>
                        <div className={`header-profile-username`}>
                            {formatWalletAddress(userAccount)}
                        </div>
                        <div className={`header-profile-wallet-address`}>
                            {formatWalletAddress(userAccount)}
                        </div>
                    </div>
                    <Link
                        className={`header-profile-button`}
                        to={`/profile`}
                        onMouseEnter={() => setProfileExpanded(true)}
                    >
                        <div className={`header-profile-picture-bg`}>
                            <img
                                className={`header-profile-picture`}
                                src={profile_picture}
                                alt={`profile-picture`}
                            />
                        </div>
                    </Link>
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
                        onClick={handleLogoutButton}
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
