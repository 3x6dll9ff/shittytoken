import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UpperLine from './header_upperline';
import '../css/header.css';
import logo_default_small from '../images/logo_small.png';
import logo_hover_small from '../images/logo_hover_small.png';

const Header = () => {
    return (
        <div>
            <UpperLine/>
            <div className='header'>
                <Logo/>
                <div className='header-menu-items-container'>
                    <LinkItem
                        title={`Home`}
                        url={`/`}
                    />
                    <LinkItem
                        title={`Crypto`}
                        url={`/crypto`}
                    />
                    <LinkItem
                        title={`Quests`}
                        url={`/quests`}
                    />
                    <LinkItem
                        title={`Blog`}
                        url={`/blog`}
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
                alt='site-logo'
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
            <div className={`header-menu-item-underline ${condition}`}></div>
        </Link>
    );
};

export default Header;
