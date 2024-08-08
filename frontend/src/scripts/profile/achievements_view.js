import React from "react";
import LastAchievementAvatar from "../../assets/profile/images/pixel-syringe.png";

const Achievements = ({locked}) => {
  return (
    <div className={`achievements-content ${locked ? 'locked' : ''}`}>
      <div className={`achievements-image`}>
        <img src={LastAchievementAvatar} width="30" height="30" alt="Icon" />
      </div>
      <div className="achievements-header-desc">
        <div className="achievements-header">Injection</div>
        <div className="achievements-desc">Complete the first quest.</div>
      </div>
      <div className="achievements-exp">300 exp</div>
    </div>
  );
}

export default Achievements;