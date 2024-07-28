import React from 'react';

const Footer = ({ pageName }) => {
    return (
        <div className='page-name-container'>
            <p>{pageName}</p>
        </div>
    );
}

export default Footer;