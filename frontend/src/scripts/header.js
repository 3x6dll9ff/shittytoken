import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import PopupMenu from "./popup-menu";
import userAPI from "./user-auth/user-api";
import { walletInstalled, okxReplaces, connectWallet } from "./user-auth/wallets_interaction";
import getCursorCoordinates from "../index";
import { formatWalletAddress } from "./utils"
import "../css/header.css";

import pixel_mask from "../assets/header/images/pixel-mask.png";

import header_logo_back from "../assets/header/images/header-logo-icons/header-logo-back.png";
import header_logo_middle from "../assets/header/images/header-logo-icons/header-logo-middle.png";
import header_logo_front from "../assets/header/images/header-logo-icons/header-logo-front.png";
import header_logo_hover from "../assets/header/images/header-logo-icons/header-logo-hover.png";

import docs_icon from "../assets/images/docs-icon.png";

import metamask_icon from "../assets/wallets_integration/images/metamask-logo.png";
import rabby_icon from "../assets/wallets_integration/images/rabby-logo.png";
import phantom_icon from "../assets/wallets_integration/images/phantom-logo.png";
import backpack_icon from "../assets/wallets_integration/images/backpack-logo.png"
import okx_icon from "../assets/wallets_integration/images/okx-logo.png";

import profile_icon from "../assets/header/images/profile-menu-icons/profile.png";
import achievement_icon from "../assets/header/images/profile-menu-icons/achievements.png";
import logout_icon from "../assets/header/images/profile-menu-icons/logout.png";

const Header = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        const tick = () => {
            const { x, y } = getCursorCoordinates();
            setX(x);
            setY(y);
        }
        const intervalId = setInterval(tick, 0);
        return () => clearInterval(intervalId);
    });

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
                <Logo/>
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
                <ProfileData />
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

const Logo = () => {
    const [moddedCoordinates, setModdedCoordinates] = useState({ x: 0, y: 0 });
    const [isHovered, setHovered] = useState(false);
    const middlePhotoRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    useEffect(() => {
        if (containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const moddedX = getCursorCoordinates().x - containerRect.left;
            const moddedY = getCursorCoordinates().y - containerRect.top;
            setModdedCoordinates({ x: moddedX, y: moddedY });
        }
    }, [getCursorCoordinates]);

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
            className={`header-menu-item ${isActive ? 'active' : ''}`}
            to={url}
        >
            {title}
        </Link>
    );
};

const ProfileData = () => {
    const [walletsPopupVisible, setWalletsPopupVisible] = useState(false);
    const [profileExpanded, setProfileExpanded] = useState(false);
    const containerRef = useRef(null);
    const [userAccount, setUserAccount] = useState({});

    const preventEvents = (event) => {
        event.preventDefault();
    };

    const handleWalletConnect = async (accessToken) => {
        if (accessToken) {
            Cookies.set(
                'access_token',
                accessToken,
                { expires: 7 }
            );
            setUserAccount(await userAPI.getUser(accessToken));
            setWalletsPopupVisible(false);
            window.location.reload();
        }
    };

    const handleLogoutButton = async () => {
        const accessToken = Cookies.get('access_token');
        await userAPI.deactivateToken(accessToken)
        Cookies.remove('access_token');
        setUserAccount({});
        setProfileExpanded(false);
        window.location.reload();
    };

    const handlePointerEnter = () => {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', preventEvents, { passive: false });
            containerRef.current.addEventListener('mousedown', preventEvents, { passive: false });
        }
    };

    const handlePointerLeave = () => {
        if (containerRef.current) {
            containerRef.current.removeEventListener('wheel', preventEvents);
            containerRef.current.removeEventListener('mousedown', preventEvents);
        }
        setProfileExpanded(false);
    };

    useEffect(() => {
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', preventEvents);
                containerRef.current.removeEventListener('mousedown', preventEvents);
            }
        };
    });

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            userAPI.getUser(accessToken).then(
                user => setUserAccount(user)
            )
        }
    }, []);

    if (!userAccount.hasOwnProperty('id') && !userAccount['id']) {
        return (
            <div className={`header-profile-data-container`}>
                <PopupMenu
                    visible={walletsPopupVisible}
                    onClose={() => setWalletsPopupVisible(false)}
                    title={`CONNECT_WALLET.exe`}
                    style={{width: '35%'}}
                >
                    <WalletsPopupButton wallet={`metamask`} onWalletConnect={handleWalletConnect}/>
                    <WalletsPopupButton wallet={`rabby`} onWalletConnect={handleWalletConnect}/>
                    <WalletsPopupButton wallet={`phantom`} onWalletConnect={handleWalletConnect}/>
                    <WalletsPopupButton wallet={`backpack`} onWalletConnect={handleWalletConnect}/>
                </PopupMenu>
                <div
                    className={`header-profile-wallet-button`}
                    onClick={() => setWalletsPopupVisible(true)}
                >
                    Connect Wallet
                </div>
            </div>
        );
    }
    else {
        const userDocs = userAccount['curr_docs_streak'];
        const userAvatar = userAccount['avatar'];
        const username = userAccount['username'];
        const userAddress = userAccount['web3_address'];

        return (
            <div className={`header-profile-data-container`}>
                <div className={`header-profile-docs-counter`}>
                    <img
                        className={`header-profile-docs-counter-icon`}
                        src={docs_icon}
                        alt={`docs counter icon`}
                    />
                    <div className={`header-profile-docs-counter-text`}>
                        {userDocs}
                    </div>
                </div>
                <div
                    className={`header-profile-info-container ${profileExpanded ? 'expanded' : ''}`}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    ref={containerRef}
                >
                    <div className={`header-profile-info`}>
                        <div className={`header-profile-info-text-container`}>
                            <div className={`header-profile-info-username`}>
                                {formatWalletAddress(username)}
                            </div>
                            <div className={`header-profile-info-wallet-address`}>
                                {formatWalletAddress(userAddress)}
                            </div>
                        </div>
                        <Link
                            className={`header-profile-info-button`}
                            to={`/profile`}
                            onPointerEnter={() => setProfileExpanded(true)}
                        >
                            <div className={`header-profile-info-picture-bg`}>
                                <img
                                    className={`header-profile-info-picture`}
                                    src={userAvatar}
                                    alt={`profile-picture`}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className={`header-profile-info-menu-buttons-container`}>
                        <ProfileButton
                            title={`My profile`}
                            img_src={profile_icon}
                            onClick={`/profile`}
                        />
                        <ProfileButton
                            title={`Achievements`}
                            img_src={achievement_icon}
                        />
                        <div className={`header-profile-info-menu-separator`}></div>
                        <ProfileButton
                            title={`Logout`}
                            img_src={logout_icon}
                            onClick={handleLogoutButton}
                            alt={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

const WalletsPopupButton = ({wallet, onWalletConnect}) => {
    const walletNames = {
        metamask: 'Metamask',
        rabby: 'Rabby',
        phantom: 'Phantom',
        backpack: 'Backpack',
    };

    const walletIcons = {
        metamask: metamask_icon,
        rabby: rabby_icon,
        phantom: phantom_icon,
        backpack: backpack_icon,
        default: ''
    };

    return (
        <div
            className={`header-profile-wallet-popup-button ${walletInstalled(wallet) ? '' : 'disabled'}`}
            onClick={walletInstalled(wallet) ? () => connectWallet(wallet, onWalletConnect) : null}
        >
            <div className={`header-profile-wallet-popup-button-icon-container`}>
                {okxReplaces(wallet) ? (
                    <img
                        className={`header-profile-wallet-popup-button-icon right ${walletInstalled(wallet) ? '' : 'disabled'}`}
                        src={okx_icon}
                        alt={`header-profile-wallet-popup-button-icon`}
                    />
                ) : null}
                <img
                    className={`header-profile-wallet-popup-button-icon ${okxReplaces(wallet) ? 'left' : ''} ${walletInstalled(wallet) ? '' : 'disabled'}`}
                    src={walletIcons[wallet]}
                    alt={`header-profile-wallet-popup-button-icon`}
                />
            </div>
            <div className={`header-profile-wallet-popup-button-wallet-name-text-container ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                <div className={`header-profile-wallet-popup-button-wallet-name-text ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                    {walletNames[wallet] || wallet}{okxReplaces(wallet) ? ' / OKX Wallet' : ''}
                </div>
                <div
                    className={`header-profile-wallet-popup-button-wallet-status-text ${walletInstalled(wallet) ? 'green' : 'red'}`}>
                    {walletInstalled(wallet) ? 'Installed' : 'Not installed'}
                </div>
            </div>
        </div>
    );
}

const ProfileButton = ({title, img_src, onClick, alt}) => {
    const link = useLocation().pathname
    let linkTo;
    if (typeof onClick === 'string') {
        linkTo = onClick;
        onClick = () => {}
    }
    else {
        linkTo = link;
    }

    return (
        <Link
            className={`header-profile-info-menu-button ${alt ? 'alt' : ''}`}
            onClick={onClick}
            to={linkTo}
        >
            <img
                className={`header-profile-info-menu-button-icon`}
                src={img_src}
                alt={`header-profile-menu-button-icon`}
            />
            <div className={`header-profile-info-menu-button-text`}>
                {title}
            </div>
        </Link>
    );
};

export default Header;
