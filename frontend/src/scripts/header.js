import React, { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { Link, useLocation } from "react-router-dom";
import { formatWalletAddress } from "./utils"
import "../css/header.css";

import pixel_mask from "../assets/header/images/pixel-mask.png";

import header_logo_back from "../assets/header/images/header-logo-icons/header-logo-back.png";
import header_logo_middle from "../assets/header/images/header-logo-icons/header-logo-middle.png";
import header_logo_front from "../assets/header/images/header-logo-icons/header-logo-front.png";
import header_logo_hover from "../assets/header/images/header-logo-icons/header-logo-hover.png";

import docs_icon from "../assets/images/docs-icon.png";

import close_icon from "../assets/images/close-icon.png";
import metamask_icon from "../assets/header/images/wallets-popup-icons/metamask-logo.png";
import rabby_icon from "../assets/header/images/wallets-popup-icons/rabby-logo.png";
import phantom_icon from "../assets/header/images/wallets-popup-icons/phantom-logo.png";
import backpack_icon from "../assets/header/images/wallets-popup-icons/backpack-logo.png"

import profile_picture from "../assets/images/placeholder-profile.png";
import profile_icon from "../assets/header/images/profile-menu-icons/profile.png";
import achievement_icon from "../assets/header/images/profile-menu-icons/achievements.png";
import logout_icon from "../assets/header/images/profile-menu-icons/logout.png";

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

const Logo = ({clientCursorCoordinates}) => {
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
            className={`header-menu-item ${isActive ? 'active' : ''}`}
            to={url}
        >
            {title}
        </Link>
    );
};

const ProfileData = () => {
    const [walletsPopupVisible, setWalletsPopupVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [profileExpanded, setProfileExpanded] = useState(false);
    const [userAccount, setUserAccount] = useState(null);
    const [docsCount, /* TODO uncomment -> setDocsCount */ ] = useState(37);
    const containerRef = useRef(null);

    const preventEvents = (event) => {
        event.preventDefault();
    };

    const handleWalletConnect = (account) => {
        setUserAccount(account)
        setLoggedIn(true);
        setWalletsPopupVisible(false);
    };

    const handleLogoutButton = () => {
        setUserAccount(null)
        setLoggedIn(false);
        setProfileExpanded(false);
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

    if (!loggedIn) {
        return (
            <div className={`header-profile-data-container`}>
                <WalletsPopup
                    visible={walletsPopupVisible}
                    onClose={() => setWalletsPopupVisible(false)}
                    onWalletConnect={handleWalletConnect}
                />
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
        return (
            <div className={`header-profile-data-container`}>
                <div className={`header-profile-docs-counter`}>
                    <img
                        className={`header-profile-docs-counter-icon`}
                        src={docs_icon}
                        alt={`docs counter icon`}
                    />
                    <div className={`header-profile-docs-counter-text`}>
                        {docsCount}
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
                                {formatWalletAddress(userAccount)}
                            </div>
                            <div className={`header-profile-info-wallet-address`}>
                                {formatWalletAddress(userAccount)}
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
                                    src={profile_picture}
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

const WalletsPopup = ({visible, onClose, onWalletConnect}) => {
    const popupRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose()
            document.removeEventListener('keydown', handleKeyDown);
        }
    };

    const preventEvents = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.addEventListener('wheel', preventEvents, { passive: false });
            popupRef.current.addEventListener('mousedown', preventEvents, { passive: false });
        }

        return () => {
            if (popupRef.current) {
                popupRef.current.removeEventListener('wheel', preventEvents);
                popupRef.current.removeEventListener('mousedown', preventEvents);
            }
        };
    });

    if (visible) {
        document.addEventListener('keydown', handleKeyDown);

        return (
            <div
                className={`header-profile-wallet-popup-container`}
                ref={popupRef}
            >
                <div
                    className={`header-profile-wallet-popup-bg`}
                    onClick={onClose}
                />
                <div className={`header-profile-wallet-popup-window`}>
                    <div className={`header-profile-wallet-popup-top-bar`}>
                        <div className={`header-profile-wallet-popup-top-bar-title`}>
                            CONNECT_WALLET.exe
                        </div>
                        <div
                            className={`header-profile-wallet-popup-top-bar-close-button`}
                            onClick={onClose}
                        >
                            <img
                                className={`header-profile-wallet-popup-top-bar-close-button-icon`}
                                src={close_icon}
                                alt={`close-icon`}
                            />
                        </div>
                    </div>
                    <div className={`header-profile-wallet-popup-buttons-container`}>
                        <WalletsPopupButton wallet={`metamask`} onWalletConnect={onWalletConnect}/>
                        <WalletsPopupButton wallet={`rabby`} onWalletConnect={onWalletConnect}/>
                        <WalletsPopupButton wallet={`phantom`} onWalletConnect={onWalletConnect}/>
                        <WalletsPopupButton wallet={`backpack`} onWalletConnect={onWalletConnect}/>
                    </div>
                </div>
            </div>
        );
    }
}

const WalletsPopupButton = ({wallet, onWalletConnect}) => {
    const walletNames = {
        metamask: 'Metamask',
        rabby: 'Rabby',
        phantom: 'Phantom',
        backpack: 'Backpack',
    };
    const walletName = walletNames[wallet] || wallet;

    const walletIcons = {
        metamask: metamask_icon,
        rabby: rabby_icon,
        phantom: phantom_icon,
        backpack: backpack_icon,
        default: ''
    };

    const walletInstalled = (wallet) => {
        switch (wallet) {
            case ('metamask'): {
                return window.ethereum && window.ethereum.isMetaMask;
            }
            case ('rabby'): {
                return window.rabby;
            }
            case ('phantom'): {
                return window.solana && window.solana.isPhantom;
            }
            case ('backpack'): {
                return window.backpack;
            }
            default: {
                return false;
            }
        }
    }

    const connectWallet = async (wallet) => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const createSignInMessage = () => {
            return `Sign-in message: ${new Date().toISOString()}`;
        };

        const web3 = new Web3(window.ethereum);

        try {
            let accounts = null;
            let response = null;
            switch (wallet) {
                case ('metamask'): {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    accounts = await web3.eth.getAccounts();
                    break;
                }
                case ('rabby'): {
                    accounts = await window.rabby.request({ method: 'eth_requestAccounts' });
                    break;
                }
                case ('phantom'): {
                    response = await window.solana.connect();
                    break;
                }
                case ('backpack'): {
                    response = await window.backpack.connect();
                    break;
                }
            }

            let account = null;
            if (accounts) {
                account = accounts[0];
            }
            else if (response) {
                account = response.publicKey.toString();
            }

            if (!account) { throw Error(`Не удалось получить ${walletName} аккаунт.`); }

            const message = createSignInMessage();
            let encodedMessage = null;
            switch (wallet) {
                case ('metamask'):
                case ('rabby'): {
                    encodedMessage = web3.utils.asciiToHex(message);
                    break;
                }
                case ('phantom'):
                case ('backpack'): {
                    encodedMessage = new TextEncoder().encode(message);
                    break;
                }
            }

            let signature = null;
            switch (wallet) {
                case ('metamask'): {
                    signature = await window.ethereum.request({
                        method: 'personal_sign',
                        params: [encodedMessage, account],
                    });
                    break;
                }
                case ('rabby'): {
                    await delay(500);
                    signature = await window.rabby.request({
                        method: 'personal_sign',
                        params: [encodedMessage, account],
                    });
                    break;
                }
                case ('phantom'): {
                    signature = await window.solana.signMessage(encodedMessage);
                    break;
                }
                case ('backpack'): {
                    signature = await window.backpack.signMessage(encodedMessage);
                    break;
                }
            }

            switch (wallet) {
                case ('metamask'):
                case ('rabby'): {
                    console.log(`Message signed: ${message}, Signature: ${signature}`);
                    break;
                }
                case ('phantom'):
                case ('backpack'): {
                    console.log(`Message signed: ${message}, Signature: ${signature.toString()}`);
                    break;
                }
            }
            console.log(`${walletName} подключен: ${account}`);

            onWalletConnect(account);
        }
        catch (error) {
            console.error(`Ошибка подключения кошелька ${walletName}:`, error);
        }
    };

    return (
        <div
            className={`header-profile-wallet-popup-button ${walletInstalled(wallet) ? '' : 'disabled'}`}
            onClick={walletInstalled(wallet) ? () => connectWallet(wallet) : null}
        >
            <img
                className={`header-profile-wallet-popup-button-icon ${walletInstalled(wallet) ? '' : 'disabled'}`}
                src={walletIcons[wallet]}
                alt={`header-profile-wallet-popup-button-icon`}
            />
            <div className={`header-profile-wallet-popup-button-wallet-name-text-container ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                <div className={`header-profile-wallet-popup-button-wallet-name-text ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                    {walletNames[wallet] || wallet}
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
