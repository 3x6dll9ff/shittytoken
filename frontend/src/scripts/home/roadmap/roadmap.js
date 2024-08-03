import React from 'react';
import RoadmapCard from './roadmap_card';
import PageName from '../page_name';
import '../../../css/home/roadmap.css';

const Roadmap = () => {
  let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <div className="roadmap-container">
      <RoadmapCard season_number='1' header='Boost community' text={text}/>
      <RoadmapCard season_number='2' className='reversed' header='Boost community' text={text}/>
      <RoadmapCard season_number='3' header='Boost community' text={text}/>
      <RoadmapCard season_number='4' className='reversed' header='Boost community' text={text}/>
      <RoadmapCard season_number='5' header='Boost community' text={text}/>

      <PageName pageName='ROADMAP'/>
    </div>
  );
};

export default Roadmap;
