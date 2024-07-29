import React from 'react';

const Ellipse = ({ quarter, year, className }) => {
    return (
        <svg className={`ellipse ${className ? className : ''}`} width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="100" rx="100" ry="100" fill="white" stroke="black" strokeWidth="6"/>
            <text x="100" y="108" className='ellipse-text' textAnchor="middle" dominantBaseline="middle">
                <tspan className="quarter" fill="#FF0000">{quarter}</tspan>
                <tspan className="year">{year}</tspan>
            </text>
        </svg>
    );
}

export default Ellipse;
