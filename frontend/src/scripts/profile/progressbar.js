import React from 'react';
import '../../css/profile/progress.css'; 

const ProgressBar = ({ progress }) => {
  const sanitizedProgress = Math.max(0, Math.min(progress, 100));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${sanitizedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
