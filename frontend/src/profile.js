import React from 'react';
import "./css/profile/profile.css";
import avatarImage from "../src/assets/images/placeholder_profile.png";
import docImage from "../src/assets/images/doc.png";
import ProgressBar from "./scripts/profile/progress_bar";
import SeasonProgressBar from "./scripts/profile/season_pass_bar";
import Achievements from "./scripts/profile/achievements_view"
import { connectWallet }  from "./scripts/wallet_connect";
import OPChain from './assets/quests/images/OPChain.png';
import questsCardCompanyImg from '../src/assets/quests/images/quests-card-company-img.png'
import image1 from './assets/quests/images/quest_pic_big.png';



const slides = Array.from({ length: 10 }).map((_, index) => (
    <div className="quests-card-quests">
        <a href="https://qredo.com" rel="noopener noreferrer">
            <div className='quests-card-quests-img-info'>
                <a href="https://optimism.io" rel="noopener noreferrer">
                    <div className='quests-card-quests-img-info-company'>
                        <img src={questsCardCompanyImg} alt="Company Logo"/>
                        <p>Aave</p>
                    </div>
                </a>
                <a href="https://optimism.io" rel="noopener noreferrer">
                    <div className='quests-card-quests-img-info-chain'>
                        <img src={OPChain} alt="Chain Logo Card"/>
                    </div>
                </a>
            </div>
            <img src={image1} alt={'altText'}/>
            <div className="quests-card-quests-text">
                <p>Stable-coin Yields on Optimism</p>
            </div>
            <div className="quests-card-quests-points-tasks">
                <div className="quests-card-quests-points-tasks-inner">
                    <div className="quests-card-quests-tasks">
                        <p>7 tasks</p>
                    </div>
                    <div className="quests-card-quests-points">
                        <p>500 exp</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
));

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: null
        };
        this.onConnect = this.onConnect.bind(this);
    }

    // Метод для подключения кошелька
    onConnect() {
        connectWallet(account => {
            this.setState({ userAccount: account });
            console.log(account);
        });
    }

    // Метод для форматирования адреса кошелька
    formatWalletAddress(address) {
        if (!address) return 'No wallet connected';
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }

    render() {
        const { userAccount } = this.state;

        return (
            <div className="profile-container">
                {/* ID Container */}
                <div className="id-container">
                    <div className="header-id">ID CARD</div>
                    <div className="id-block">
                        <div className="avatar-profile">
                            <img src={avatarImage} alt="Avatar"/>
                        </div>
                        <div className="profile-details">
                            <div className="name-profile">HAZE</div>
                            <div className="wallet-profile"> {userAccount ? this.formatWalletAddress(userAccount) : 'No wallet connected'}</div>
                            <div className="user-stats">
                                <div className="user-stat">
                                    <div className="stat-title">Docs</div>
                                    <div className="stat-content">
                                        <img src={docImage} width="11" height="15" alt="Icon"/>
                                        <span>50</span>
                                    </div>
                                </div>
                                <div className="user-stat">
                                    <div className="stat-title">Points</div>
                                    <div className="stat-content">
                                        <img src={docImage} width="11" height="15" alt="Icon"/>
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
                            <ProgressBar initialProgress={20}/>
                        </div>
                        <div className="wen-joined">Joined 20.07.2024</div>
                    </div>
                </div>
                {/* Drops Container */}
                <div className="drops-container">
                    <div className="header-drops">Season Pass</div>
                    <div className="drops-block">
                        <div className="profile-seasonpass-block">
                            <div className="season-pentagon-container pentagon-start">
                                <div className="pentagon-start-white">
                                    <div className="pentagon-start-black">
                                        <div className="season-grade-number">1</div>
                                    </div>
                                </div>
                            </div>
                            <div className="season-progress-bar-container">
                                <SeasonProgressBar initialSeasonProgress={50}/>
                            </div>
                            <div className="season-pentagon-container pentagon-middle">
                                <div className="pentagon-middle-white">
                                    <div className="pentagon-middle-black">
                                        <div className="season-grade-number">2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="season-pentagon-container pentagon-end">
                                <div className="pentagon-end-white">
                                    <div className="pentagon-end-black">
                                        <div className="season-grade-number">3</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-claim-block">
                            <div className="profile-claim-text">Collect your reward!</div>
                            <div className="profile-button-claim">
                                <div onClick={this.onConnect} className="profile-button-claim-text">Claim</div>
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
                                <Achievements/>
                            </div>

                            <div className="unlocked-achievements-header">
                                Unlocked achievements:
                            </div>
                            <Achievements/>
                            <Achievements/>
                            <Achievements/>

                            <div className="available-achievements">Available achievements:</div>
                            <Achievements locked={true}/>
                            <Achievements locked={true}/>
                            <Achievements locked={true}/>
                            <Achievements locked={true}/>
                            <Achievements locked={true}/>
                        </div>
                    </div>
                </div>
                {/* Quests Container */}
                <div className="quests-container">
                    <div className="quests-block">
                        <div className="header-complited-quests">Completed quests</div>
                        <div className="profile-done-cards">
                            <div className="cards-wrapper">
                                {slides}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;