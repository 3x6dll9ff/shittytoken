// src/components/BackgroundVideo.js
import React from 'react';
import '../../css/stuff.css';
import PageName from '../page_name';
import Card from './card';

import hacker1 from '../../assets/images/hackers/hacker1.png'
import hacker2 from '../../assets/images/hackers/hacker2.png'
import hacker3 from '../../assets/images/hackers/hacker3.png'


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


const Stuff = () => {
  return (
    <div className="stuff-container">
      <PageName pageName='STUFF'/>
      <Card signature='@HAZE' image={hacker1} description_data={cardData}/>
      <Card signature='@NOTHACKER' image={hacker2} description_data={cardData}/>
      <Card signature='@FINGERPRINT' image={hacker3} description_data={cardData}/>
      <Card signature='@HACKER4' image={hacker2} description_data={cardData}/>
    </div>
  );
};

export default Stuff;
