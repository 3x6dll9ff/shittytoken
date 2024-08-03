import React from "react";
import "./css/profile/profile.css";
import avatarImage from "../src/assets/images/placeholder_profile.png";
import docImage from "../src/assets/images/doc.png";
import ProgressBar from "./scripts/profile/progress_bar";
import SeasonProgressBar from "./scripts/profile/season_pass_bar";
import Achievements from "./scripts/profile/achievements_view"
class Profile extends React.Component {
  render() {
    return (
      <div className="profile-container">
        {/* ID Container */}
        <div className="id-container">
          <div className="header-id">ID CARD</div>
          <div className="id-block">
            <div className="avatar-profile">
              <img src={avatarImage} alt="Avatar" />
            </div>
            <div className="profile-details">
              <div className="name-profile">HAZE</div>
              <div className="wallet-profile">0xd901AbA388A3e...</div>
              <div className="user-stats">
                <div className="user-stat">
                  <div className="stat-title">Docs</div>
                  <div className="stat-content">
                    <img src={docImage} width="11" height="15" alt="Icon" />
                    <span>50</span>
                  </div>
                </div>
                <div className="user-stat">
                  <div className="stat-title">Points</div>
                  <div className="stat-content">
                    <img src={docImage} width="11" height="15" alt="Icon" />
                    <span>50</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="level-grade">
              <div className="pentagon-container">
                <div className="pentagon-white">
                  <div className="pentagon-black">
                    <div className="grade-number">1</div>
                  </div>
                </div>
              </div>
              <ProgressBar initialProgress={20} />
            </div>
            <div className="wen-joined">Joined 20.07.2024</div>
          </div>
        </div>
        {/* Drops Container */}

        <div className="drops-container">
          <div className="header-drops">Season Pass</div>
          <div className="drops-block">
            <div className="profile-seasonpass-block">
              <SeasonProgressBar initialSeasonProgress={20} />
            </div>
            <div className="profile-claim-block">
              <div className="profile-claim-text">Collect your reward!</div>
              <div className="profile-button-claim">
                <div className="profile-button-claim-text">Claim</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Container */}
        <div className="achievements-container">
          <div className="achievements-block">
            <div className="header-achievements">Achievements</div>

            <div className="scroll-achievements">
              <div className="last-achievements">
                <div className="last-achievements-header">
                  Last achievement:
                </div>
                <Achievements />
              </div>

              <div className="unlocked-achievements-header">
                Unlocked achievements:
              </div>
              <Achievements />
              <Achievements />
              <Achievements />

              <div className="available-achievements">Available achievements:</div>
              <Achievements locked={true} />
              <Achievements locked={true} />
              <Achievements locked={true} />
              <Achievements locked={true} />
              <Achievements locked={true} />
            </div>
          </div>
        </div>

        {/* Quests Container */}
        <div className="quests-container">
          <div className="quests-block">
            <div className="header-complited-quests">Completed quests</div>
            

          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
