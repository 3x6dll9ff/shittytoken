// src/components/BackgroundVideo.js
import React from 'react';
import '../css/home.css'; // Подключаем стили
import hdd from '../assets/images/hdd.png'

const Tokenomics = () => {
  return (
    <div className='tokenomics-wrapper'>

      <div className="tokenomics-container">
        <div className='allocation-video'>
          <div className='hdd-container'>
              <img src={hdd} alt="Hdd" />
              <p className="hdd-text">
                <span className="percentage">20%</span> - Ecosystem
              </p>
          </div>
        </div>

        <div className='allocation-text-wrapper'>
            <p className='header-allocation'>Percentage allocation</p>
            <p className="hdd-text">
              <span className="percentage">20%</span> - Ecosystem
            </p>
            <p className="hdd-text">
              <span className="percentage">5%</span> - IDO / ICO
            </p>
            <p className="hdd-text">
              <span className="percentage">75%</span> - Ecosystem
            </p>
        </div>
      </div>

      <div className='tokenomics-text-container'>
        <div className='page-name-container'>
          <p className='page-name-text'>TOKENOMICS</p>
        </div>

        <div className='supply-value-container'>
            <p className="supply-text">
              Total Supply - <span className="percentage">21,000,000</span> 
            </p>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
