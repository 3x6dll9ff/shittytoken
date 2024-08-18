import React from 'react';
import SlideTitle from './slide_title.jsx';
import Stuff_slide_card from './stuff_slide_card.jsx';
import '../css/stuff.css';

import hacker1 from '../assets/images/hackers/hacker1.png';
import hacker2 from '../assets/images/hackers/hacker2.png';
import hacker3 from '../assets/images/hackers/hacker3.png';


const cardData = {
    name: "Name Example",
    aka: "Aka Example",
    age: 30,
    location: "Location",
    role: "Architect",
    nationality: "Nationality",
    balance: "100 BTC",
    crimes: [
        "SQL-injections",
        "Hacking corporate networks",
        "Phishing",
        "DDoS attacks"
    ]
};


const Stuff_slide = () => {
    return (
        <div className="stuff-container">
            <SlideTitle pageName='STUFF'/>
            <Stuff_slide_card signature='@HAZE' image={hacker1} description_data={cardData}/>
            <Stuff_slide_card signature='@NOTHACKER' image={hacker2} description_data={cardData}/>
            <Stuff_slide_card signature='@FINGERPRINT' image={hacker3} description_data={cardData}/>
            <Stuff_slide_card signature='@HACKER4' image={hacker2} description_data={cardData}/>
        </div>
    );
};

export default Stuff_slide;
