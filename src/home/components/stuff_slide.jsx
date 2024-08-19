import React from 'react';
import SlideTitle from './slide_title.jsx';
import Stuff_slide_card from './stuff_slide_card.jsx';
import '../css/stuff.css';

import hacker1 from '../assets/images/hackers/hacker1.jpg';
import hacker2 from '../assets/images/hackers/hacker2.png';
import hacker3 from '../assets/images/hackers/hacker3.png';


const cardData_hacker1 = {
    name: "Dylan Campbell",
    aka: "Haze",
    nationality: "Canadian",
    location: "Toronto",
    balance: "17 BTC",
    age: 30,
    role: "Architect",
    crimes: [
        "Cryptojacking",
        "ICO scams",
        "Smart contract exploits",
        "Phishing",
    ]
};


const Stuff_slide = () => {
    return (
        <div className="stuff-container">
            <SlideTitle pageName='STUFF'/>
            <Stuff_slide_card signature='@HAZE' image={hacker1} description_data={cardData_hacker1}/>
            <Stuff_slide_card signature='@NOTHACKER' image={hacker2} description_data={cardData_hacker1}/>
            <Stuff_slide_card signature='@FINGERPRINT' image={hacker3} description_data={cardData_hacker1}/>
            <Stuff_slide_card signature='@HACKER4' image={hacker2} description_data={cardData_hacker1}/>
        </div>
    );
};

export default Stuff_slide;
