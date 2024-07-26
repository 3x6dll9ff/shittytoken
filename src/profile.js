import React from "react";
import avatarImage from '../src/assets/images/placeholder_profile.png';
import "./css/profile.css";

class Profile extends React.Component {
    render() {
      return (
        <div className="profile-container">
          <div className="id-container">
            <div className="header-id">ID CARD</div>
            <div className="id-block">

                <div className="avatar-profile">
                <img src={avatarImage} alt="Avatar" />
                </div>
                <div>
                    <div className="name-profile">
                    HAZE
                    </div>
                    <div className="wallet-profile">
                    0xd901AbA388A3e...
                    </div>
                    <div className="user-stats">
                      <div className="user-stat">
                        <div className="stat-title">Max Streak</div>
                        <div className="stat-content">
                          <img src={avatarImage} width="11" height="15" />
                          <span>50</span>
                        </div>
                      </div>
                      <div className="user-stat">
                        <div className="stat-title">Points</div>
                        <div className="stat-content">
                          <img src={avatarImage} width="11" height="15" />
                          <span>50</span>
                        </div>
                      </div>
                    </div>
                </div>



            </div>
          </div>
          <div className="drops-container">
            <div className="header-drops">Drops</div>
            <div className="drops-block">Drops Block Content</div>
          </div>
          <div className="achievements-block">Achievements Block Content</div>
          <div className="quests-block">Quests Block Content</div>
        </div>
      );
    }
  }
  
  

export default Profile;

{
  /* <div className="id-block">ID CARD</div>
<div className="drops-block">Drops</div>
<div className="achievements-block">Achievements</div>
<div className="quests-block">Quests</div> */
}
