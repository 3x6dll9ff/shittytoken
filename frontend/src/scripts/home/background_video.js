import React, { useState, useEffect, useRef } from 'react';
import Token from './token';
import '../../css/home/background_video.css';
import transition from '../../assets/home/video/transition.mp4';
import city1 from '../../assets/home/video/city1.mp4';
import city2 from '../../assets/home/video/city2.mp4';
import city3 from '../../assets/home/video/city3.mp4';
import city4 from '../../assets/home/video/city4.mp4';

const BackgroundVideo = ({alt = true}) => {
  const videos = [city1, city2, city3, city4];
  const [videoIndex, setVideoIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(transition);
  const videoRef = useRef(null);
  const [videoStyle, setVideoStyle] = useState({backgroundColor: 'rgba(0, 0, 0, 0)'});

  const handleVideoEnded = () => {
    if (currentVideo === transition) {
      if (alt) {
        setCurrentVideo(videos[videoIndex]);
      }
      else {
        setCurrentVideo(videos[Math.floor(Math.random() * videos.length)]);
      }
      setVideoStyle({
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      });
    }
    else {
      if (alt){
        setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
      setCurrentVideo(transition);
      setVideoStyle({
        backgroundColor: 'rgba(0, 0, 0, 0)',
      });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnded);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, [currentVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentVideo]);

  return (
      <div className="video-container">
        <div className='video-wrapper'>
          <div
              className='video-overlay'
              style={videoStyle}
          >
            <Token />
          </div>
          <video ref={videoRef} autoPlay loop={false} muted>
            <source src={currentVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
  );
};

export default BackgroundVideo;
