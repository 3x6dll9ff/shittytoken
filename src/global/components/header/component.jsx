import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import PopupMenu from "../popup-menu/component.jsx";
import userAPI from "../../scripts/user-api.js";
import {connectWallet, okxReplaces, walletInstalled} from "../../scripts/wallets_connector.js";
import {blogPath, cryptoPath, getCursorPosition, homePath, profilePath, questsPath} from "../../../index.jsx";
import {formatWalletAddress} from "../../scripts/utils.js"
import "./css/header.css";

import pixel_mask from "./assets/images/pixel-mask.png";

import header_logo_back from "./assets/images/header-logo-icons/header-logo-back.png";
import header_logo_middle from "./assets/images/header-logo-icons/header-logo-middle.png";
import header_logo_front from "./assets/images/header-logo-icons/header-logo-front.png";
import header_logo_hover from "./assets/images/header-logo-icons/header-logo-hover.png";

import docs_icon from "../../assets/images/docs-icon.png";

import network_icon_0 from "./assets/images/network-icons/network-icon-0.png";
import network_icon_1 from "./assets/images/network-icons/network-icon-1.png";
import network_icon_2 from "./assets/images/network-icons/network-icon-2.png";
import network_icon_3 from "./assets/images/network-icons/network-icon-3.png";

import metamask_icon from "../../assets/images/metamask-logo.png";
import rabby_icon from "../../assets/images/rabby-logo.png";
import phantom_icon from "../../assets/images/phantom-logo.png";
import backpack_icon from "../../assets/images/backpack-logo.png"
import okx_icon from "../../assets/images/okx-logo.png";

import profile_icon from "./assets/images/profile-menu-icons/profile.png";
import logout_icon from "./assets/images/profile-menu-icons/logout.png";


const Header = () => {
    return (
        <div>
            <Ticker/>
            <div className={`header`}>
                <PixelMask/>
                <Logo/>
                <LinkItem
                    title={`HOME`}
                    url={homePath}
                />
                <LinkItem
                    title={`CRYPTO`}
                    url={cryptoPath}
                />
                <LinkItem
                    title={`QUESTS`}
                    url={questsPath}
                />
                <LinkItem
                    title={`BLOG`}
                    url={blogPath}
                />
                <ProfileData/>
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

const PixelMask = () => {
    const pixelMaskRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(getCursorPosition())

    useEffect(() => {
        const tick = () => {
            setCursorPosition(getCursorPosition());
            const {x, y} = cursorPosition;
            if (pixelMaskRef.current) {
                pixelMaskRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 0%, rgba(0, 0, 0, 1) 150px)`
            }
        }

        const interval = setInterval(tick, 0);
        return () => clearInterval(interval);
    });

    return (
        <div className={`header-pixel-mask-container`}>
            <img
                className={`header-pixel-mask-image`}
                src={pixel_mask}
                alt={`pixel mask`}
            />
            <div
                className={`header-pixel-mask`}
                ref={pixelMaskRef}
            />
        </div>
    );

}

const Logo = () => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
        <Link
            className="header-logo-container"
            href={homePath}
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
                    <div className="header-logo middle">
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
    const [userAccount, setUserAccount] = useState(0);

    const preventEvents = (event) => {
        event.preventDefault();
    };

    const handleWalletConnect = async (accessToken) => {
        if (accessToken) {
            Cookies.set(
                'access_token',
                accessToken,
                {expires: 7}
            );
            setUserAccount(await userAPI.getUser(accessToken));
            setWalletsPopupVisible(false);
            window.location.reload();
        }
    };

    const handleLogoutButton = async () => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            await userAPI.deactivateToken(accessToken)
            Cookies.remove('access_token');
            setUserAccount(0);
            setProfileExpanded(false);
            window.location.reload();
        }
    };

    const handlePointerEnter = () => {
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', preventEvents, {passive: false});
            containerRef.current.addEventListener('mousedown', preventEvents, {passive: false});
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
            setUserAccount(0)
            userAPI.getUser(accessToken).then(
                user => setUserAccount(user)
            )
        } else {
            setUserAccount(null);
        }
    }, []);

    if (userAccount === null) {
        return (
            <div className={`header-data-container`}>
                <PopupMenu
                    visible={walletsPopupVisible}
                    onClose={() => setWalletsPopupVisible(false)}
                    title={`CONNECT_WALLET.exe`}
                    style={{width: '35%'}}
                >
                    <ConnectWalletButton
                        wallet={`metamask`}
                        onWalletConnect={handleWalletConnect}
                    />
                    <ConnectWalletButton
                        wallet={`rabby`}
                        onWalletConnect={handleWalletConnect}
                    />
                    <ConnectWalletButton
                        wallet={`phantom`}
                        onWalletConnect={handleWalletConnect}
                    />
                    <ConnectWalletButton
                        wallet={`backpack`}
                        onWalletConnect={handleWalletConnect}
                    />
                </PopupMenu>
                <PingWidget/>
                <div
                    className={`header-data-connect-wallet-button`}
                    onClick={() => setWalletsPopupVisible(true)}
                >
                    Connect Wallet
                </div>
            </div>
        );
    } else if (userAccount && userAccount.hasOwnProperty('id')) {
        const userAvatar = userAccount['avatar'];
        const username = userAccount['username'];
        const userAddress = userAccount['web3_address'];

        return (
            <div className={`header-data-container`}>
                <DocsCounter userAccountExt={userAccount}/>
                <PingWidget/>
                <div
                    className={`header-data-profile-info-container ${profileExpanded ? 'expanded' : ''}`}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    ref={containerRef}
                >
                    <div className={`header-data-profile-info`}>
                        {profileExpanded ? (
                            <div className={`header-data-profile-info-text-container`}>
                                <div className={`header-data-profile-info-username`}>
                                    {formatWalletAddress(username)}
                                </div>
                                <div className={`header-data-profile-info-wallet-address`}>
                                    {formatWalletAddress(userAddress)}
                                </div>
                            </div>
                        ) : null}
                        <Link
                            className={`header-data-profile-info-button`}
                            to={profilePath}
                            onPointerEnter={() => setProfileExpanded(true)}
                        >
                            <div className={`header-data-profile-info-picture-bg`}>
                                <img
                                    className={`header-data-profile-info-picture`}
                                    src={userAvatar}
                                    alt={`profile-picture`}
                                />
                            </div>
                        </Link>
                    </div>
                    {profileExpanded ? (
                        <div className={`header-data-profile-info-menu-buttons-container`}>
                            <ProfileButton
                                title={`My profile`}
                                img_src={profile_icon}
                                onClick={profilePath}
                            />
                            {/* TODO VVV uncomment if needed VVV */}
                            {/*<ProfileButton*/}
                            {/*    title={`Achievements`}*/}
                            {/*    img_src={achievement_icon}*/}
                            {/*/>*/}
                            <div className={`header-data-profile-info-menu-separator`}></div>
                            <ProfileButton
                                title={`Logout`}
                                img_src={logout_icon}
                                onClick={handleLogoutButton}
                                alt={true}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    } else {
        return null;
    }
};

const Timer = ({grabTime, onFinish}) => {
    const {hours, minutes, seconds} = grabTime;
    const [time, setTime] = useState({hours, minutes, seconds});

    useEffect(() => {
        let timer;
        if (time.hours > 0 || time.minutes > 0 || time.seconds > 0) {
            timer = setInterval(() => {
                decrementTime();
            }, 1000);
        } else {
            clearInterval(timer);
            if (onFinish) {
                onFinish();
            }
        }

        return () => clearInterval(timer);
    }, [time]);

    const decrementTime = () => {
        setTime((prevTime) => {
            const {hours, minutes, seconds} = prevTime;

            if (seconds > 0) {
                return {...prevTime, seconds: seconds - 1};
            } else if (minutes > 0) {
                return {hours, minutes: minutes - 1, seconds: 59};
            } else if (hours > 0) {
                return {hours: hours - 1, minutes: 59, seconds: 59};
            }

            return prevTime;
        });
    };

    const formatTime = () => {
        const {hours, minutes, seconds} = time;
        const formatNumber = (num) => String(num).padStart(2, '0');
        return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    };

    return formatTime();
};

const DocsCounter = ({userAccountExt}) => {
    const grabDocsButtonStates = {
        default: 'Grab docs',
        disabled: '...',
    }

    const [docsCounterHovered, setDocsCounterHovered] = useState(false);
    const [docsDropdownVisible, setDocsDropdownVisible] = useState(false);
    const [userAccount, setUserAccount] = useState(userAccountExt);
    const [docsStatus, setDocsStatus] = useState(null);
    const [grabDocsButtonDisabled, setGrabDocsButtonDisabled] = useState(true);
    const [grabDocsButtonHasTimer, setGrabDocsButtonHasTimer] = useState(false);


    const handlePointerEnter = () => {
        setDocsCounterHovered(true)
        setDocsDropdownVisible(true);
    }

    const handlePointerLeave = () => {
        setDocsCounterHovered(false)
        setDocsDropdownVisible(false);
    }

    const updateDocsStatus = (accessToken = null) => {
        if (!accessToken) {
            accessToken = Cookies.get('access_token');
        }

        if (accessToken) {
            userAPI.checkDocsStatus(accessToken)
                .then(docs => {
                    setDocsStatus(docs);
                    if (docs && docs['can_grab']) {
                        setGrabDocsButtonDisabled(false);
                    } else if (docs && !docs['can_grab']) {
                        setGrabDocsButtonHasTimer(true);
                    }
                })
        }
    }

    const handleGrabDocsButton = () => {
        setGrabDocsButtonDisabled(true);
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            userAPI.grabDocs(accessToken).then(() => {
                userAPI.getUser(accessToken).then(account => setUserAccount(account))
                updateDocsStatus(accessToken);
            })
        }
    }

    const handleTimerFinish = () => {
        setGrabDocsButtonDisabled(false);
    }

    useEffect(() => {
        updateDocsStatus();
    }, []);

    return (
        <div
            className={`header-data-profile-docs-counter`}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <img
                src={docs_icon}
                alt={`docs counter icon`}
            />
            <span>{userAccount['curr_docs_streak']}</span>

            {docsCounterHovered || docsDropdownVisible ? (
                <div
                    className={`header-data-profile-docs-counter-dropdown`}
                    onPointerLeave={() => setDocsDropdownVisible(false)}
                >
                    <p>Max docs grabbed:</p>
                    <div className={`header-data-profile-docs-counter-dropdown-max-docs`}>
                        <img
                            src={docs_icon}
                            alt={`docs icon`}
                        />
                        <div>{userAccount['max_docs_streak']}</div>
                    </div>
                    <button
                        className={grabDocsButtonDisabled ? 'disabled' : ''}
                        onClick={grabDocsButtonDisabled ? null : handleGrabDocsButton}
                    >
                        {grabDocsButtonHasTimer ? (
                            <Timer
                                grabTime={docsStatus['time_left']}
                                onFinish={handleTimerFinish}
                            />
                        ) : (
                            grabDocsButtonDisabled ?
                                (grabDocsButtonStates.disabled)
                                :
                                (grabDocsButtonStates.default))
                        }
                    </button>
                </div>
            ) : null}
        </div>
    );
}

const PingWidget = () => {
    const updatePing = () => {
        const startTime = performance.now();
        fetch(window.location.origin, {method: 'HEAD', mode: 'no-cors'})
            .then(() => {
                const ping = (performance.now() - startTime).toFixed(0)
                setPing(ping);

                if (ping < 1000) {
                    setPingIcon(network_icon_1);
                } else if (ping < 1500) {
                    setPingIcon(network_icon_2);
                } else if (ping < 2000) {
                    setPingIcon(network_icon_3);
                } else {
                    setPingIcon(network_icon_0);
                }
            });
    }

    const [ping, setPing] = useState(null);
    const [pingIcon, setPingIcon] = useState(null);

    useEffect(() => {
        updatePing();
    }, [])

    useEffect(() => {
        const interval = setInterval(updatePing, 5000);
        return () => clearInterval(interval);
    });

    return (
        <div className={`header-data-ping-widget`}>
            <img
                src={pingIcon}
                alt={`ping-icon`}
            />
            <div>
                {ping}<span>ms</span>
            </div>
        </div>
    );
}

const ConnectWalletButton = ({wallet, onWalletConnect}) => {
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
            className={`header-data-popup-connect-wallet-button ${walletInstalled(wallet) ? '' : 'disabled'}`}
            onClick={walletInstalled(wallet) ? () => connectWallet(wallet, onWalletConnect) : null}
        >
            <div className={`header-data-popup-connect-wallet-button-icon-container`}>
                {okxReplaces(wallet) ? (
                    <img
                        className={`header-data-popup-connect-wallet-button-icon right ${walletInstalled(wallet) ? '' : 'disabled'}`}
                        src={okx_icon}
                        alt={`header-profile-wallet-popup-button-icon`}
                    />
                ) : null}
                <img
                    className={`header-data-popup-connect-wallet-button-icon ${okxReplaces(wallet) ? 'left' : ''} ${walletInstalled(wallet) ? '' : 'disabled'}`}
                    src={walletIcons[wallet]}
                    alt={`header-profile-wallet-popup-button-icon`}
                />
            </div>
            <div
                className={`header-data-popup-connect-wallet-button-wallet-name-container ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                <div
                    className={`header-data-popup-connect-wallet-button-wallet-name ${walletInstalled(wallet) ? '' : 'disabled'}`}>
                    {walletNames[wallet] || wallet}{okxReplaces(wallet) ? ' / OKX Wallet' : ''}
                </div>
                <div
                    className={`header-data-popup-connect-wallet-button-wallet-status ${walletInstalled(wallet) ? 'green' : 'red'}`}>
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
        onClick = () => {
        }
    } else {
        linkTo = link;
    }

    return (
        <Link
            className={`header-data-profile-info-menu-button ${alt ? 'alt' : ''}`}
            onClick={onClick}
            to={linkTo}
        >
            <img
                className={`header-data-profile-info-menu-button-icon`}
                src={img_src}
                alt={`header-profile-menu-button-icon`}
            />
            <div className={`header-data-profile-info-menu-button-text`}>
                {title}
            </div>
        </Link>
    );
};

export default Header;
