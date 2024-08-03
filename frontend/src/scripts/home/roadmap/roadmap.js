import React from 'react';
import RoadmapCard from './roadmap_card';
import PageName from '../page_name';
import '../../../css/home/roadmap.css';

const Roadmap = () => {
  let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <div className="roadmap-container">
      <RoadmapCard quarter='4q' year='24' header='Boost community' text={text}/>
      <RoadmapCard quarter='1q' year='25' className='reversed' header='Boost community' text={text}/>
      <RoadmapCard quarter='2q' year='25' header='Boost community' text={text}/>
      <RoadmapCard quarter='3q' year='25' className='reversed' header='Boost community' text={text}/>
      <RoadmapCard quarter='4q' year='25' header='Boost community' text={text}/>

      <PageName pageName='ROADMAP'/>
    </div>
  );
};

export default Roadmap;
