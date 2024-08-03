import React, { useState, useEffect } from 'react';
import '../../css/profile/progress.css';

const ProgressBar = ({ initialProgress }) => {
  const [currentProgress, setCurrentProgress] = useState(initialProgress);
  const [difference, setDifference] = useState(0);
  const [prevProgress, setPrevProgress] = useState(initialProgress);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevProgress(currentProgress);
      setCurrentProgress((prev) => Math.min(prev + 0, 100)); // можно изменить значение 0, чтобы посмотреть как прибавляется полученная экспа
    }, 1000);

    return () => clearInterval(interval); 
  }, [currentProgress]);

  useEffect(() => {
    const newDifference = currentProgress - prevProgress;

    if (newDifference > 0) {
      setDifference(newDifference);

      const timer = setTimeout(() => {
        setDifference(0);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentProgress, prevProgress]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${prevProgress}%` }}
      ></div>
      {difference > 0 && (
        <div
          className="progress-bar-difference"
          style={{ width: `${difference}%`, left: `${prevProgress}%` }}
        ></div>
      )}
    </div>
  );
};

export default ProgressBar;
