import React from 'react';
import Token from './token';
import '../../css/home/background_video.css'; // Подключаем стили
import sample from '../../assets/home/video/hacked_city.mp4'

const BackgroundVideo = () => {
  return (
    <div className="video-container">
        <div className='video-wrapper'>

          <div className='video-overlay'>
            <Token />
          </div>

          <video autoPlay loop muted>
            <source src={sample} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
    </div>
  );
};

export default BackgroundVideo;
