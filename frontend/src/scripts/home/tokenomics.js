import React from 'react';
import PageName from './page_name';
import '../../css/home/tokenomics.css';
import hdd from '../../assets/home/images/hdd.png'

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
              <span className="percentage">75%</span> - Community
            </p>
        </div>
      </div>

      <p className="supply-text">
        Total Supply - <span className="percentage">21,000,000</span> 
      </p>

        <PageName pageName='TOKENOMICS'/>
    </div>
  );
};

export default Tokenomics;
