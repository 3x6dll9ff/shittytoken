// src/components/BackgroundVideo.js
import React from 'react';
import '../../css/stuff.css';
import PageName from '../page_name';
import Card from './card';

import hacker1 from '../../assets/images/hackers/hacker1.png'
import hacker2 from '../../assets/images/hackers/hacker2.png'
import hacker3 from '../../assets/images/hackers/hacker3.png'

const Stuff = () => {
  return (
    <div className="stuff-container">
      <PageName pageName='STUFF'/>
      <Card name='@HAZE' image={hacker1}/>
      <Card name='@NOTHACKER' image={hacker2}/>
      <Card name='@FINGERPRINT' image={hacker3}/>
      <Card name='@HACKER4' image={hacker2}/>
    </div>
  );
};

export default Stuff;
