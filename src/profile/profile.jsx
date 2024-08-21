import {Component} from "react";
import Cookies from "js-cookie";
import {homePath} from "../index.jsx";
import userAPI from "../global/scripts/user-api.js";
import PopupMenu from "../global/components/popup-menu/component.jsx";
import LoadingScreen from "../global/components/loading-screen/component.jsx";
import ProgressBar from "./components/progress_bar.jsx";
import SeasonProgressBar from "./components/season_pass_bar.jsx";
import Achievements from "./components/achievements_view.jsx";
import {datetimeToDDMMYYYY, formatWalletAddress} from "../global/scripts/utils.js";

import "./css/profile.css";

import docImage from "../global/assets/images/docs-icon.png";
import OPChain from '../quests/assets/images/chains-pics/op-chain.png';
import questsCardCompanyImg from "../quests/assets/images/company-pics/company-1-card-pic.png";
import image1 from '../quests/assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAccount: null,
            isPopupVisible: false,
        };  
        this.handleFileChange = this.handleFileChange.bind(this);
        this.updateUserAvatar = this.updateUserAvatar.bind(this);
        this.handleClaimClick = this.handleClaimClick.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    handleClaimClick() {
        this.setState({ isPopupVisible: true });
    }

    handleClosePopup() {
        this.setState({ isPopupVisible: false });
    }

    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            window.location.href = homePath;
        }
        else {
            const userAccount = await userAPI.getUser(accessToken);
            this.setState({userAccount});
        }
    }

    async updateUserAvatar(file) {
        try {
            const accessToken = Cookies.get('access_token');
            if (accessToken) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64Image = reader.result.split(',')[1];
                    await userAPI.uploadUserAvatar(accessToken, base64Image);
                    window.location.reload();
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            this.updateUserAvatar(file);
        } else {
            alert("Please upload a PNG or JPG image.");
        }
    }

    render() {
        const {userAccount} = this.state;

        if (!userAccount) {
            return <LoadingScreen/>;
        } else {
            const userAvatar = userAccount['avatar'];
            const username = userAccount['username'];
            const userAddress = userAccount['web3_address'];
            const userMaxDocs = userAccount['max_docs_streak'];
            const userExperience = userAccount['experience'];
            const userRegisteredAt = userAccount['registered_at'];

            return (
                <div className="profile-container">
                    {/* ID Container */}
                    <div className="id-container">
                        <div className="header-id">ID CARD</div>
                        <div className="id-block">
                                <img
                                    className={`avatar-profile`}
                                    src={userAvatar}
                                    alt="Avatar"
                                />
                            <div className="profile-details">
                                <div className="name-profile">{formatWalletAddress(username)}</div>
                                <div className="wallet-profile"> {formatWalletAddress(userAddress)}</div>
                                <div className="user-stats">
                                    <div className="user-stat">
                                        <div className="stat-title">Docs</div>
                                        <div className="stat-content">
                                            <img src={docImage} width="11" height="15" alt="Icon"/>
                                            <span>{userMaxDocs}</span>
                                        </div>
                                    </div>
                                    <div className="user-stat"> {/*TODO: заменить картинку для квестов*/}
                                        <div className="stat-title">Quests</div>
                                        <div className="stat-content">
                                            <img src={docImage} width="11" height="15" alt="Icon"/>
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="level-grade">
                                <div className="pentagon-container">
                                    <div className="pentagon-white">
                                        <div className="pentagon-black">
                                            <div className="grade-number">1</div> {/*todo: подвязать к беку*/}
                                        </div>
                                    </div>
                                </div>
                                <ProgressBar initialProgress={userExperience}/>
                            </div>
                            <div className="wen-joined">Joined {datetimeToDDMMYYYY(userRegisteredAt)}</div>
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
                                    <SeasonProgressBar initialSeasonProgress={50}/> {/*todo: get data from be*/}
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
                                    <div
                                        className="profile-button-claim-text"
                                        onClick={this.handleClaimClick}>
                                        Claim
                                    </div>
                                </div>
                                {/* Вызов PopupMenu */}
                                <PopupMenu
                                    visible={this.state.isPopupVisible}
                                    onClose={this.handleClosePopup}
                                    title="Edit profile.exe"
                                >
                                    <div className={'profile-edit-profile-popup-content'}>
                                        <div className={'edit-profile'}>
                                            <div className={`avatar-profile-edit `}>
                                                <img
                                                    src={userAvatar}
                                                    alt="Avatar"
                                                />
                                                <div
                                                    className="avatar-profile-fill"
                                                    onClick={() => this.fileInput.click()}
                                                >
                                                    Edit
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpeg"
                                                    style={{display: 'none'}}
                                                    ref={input => this.fileInput = input}
                                                    onChange={this.handleFileChange}
                                                />
                                            </div>
                                            <div className={'profile-edit-info'}>
                                                <div className={'profile-edit-name_info'}>
                                                    <p>NAME: wbtc</p>
                                                </div>
                                                <div className="profile-edit-name_info profile-edit-wallet"> WALLET: {formatWalletAddress(userAddress)}</div>
                                            </div>
                                        </div>
                                        <div className={'profile-connected-wallets'}>
                                            wallet connect view
                                        </div>
                                        <div className={'profile-edit-buttons'}>
                                        save cancle
                                        </div>
                                    </div>
                                </PopupMenu>
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

                                <div className="available-achievements">
                                    Available achievements:
                                </div>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
                                <Achievements locked={true}/>
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
                            <div className="header-completed-quests">Completed quests</div>
                            <div className="profile-done-cards">
                                <div className="cards-wrapper">
                                    <Slides/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        }
    }
}

const Slides = () => {
    return (
        Array.from({length: 9})
            .map((_, index) => {
                return (
                    <div className="quests-card-quests" key={index}>
                        <a href="https://qredo.com" rel="noopener noreferrer">
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
                            <div
                                className='quests-card-quests-img-info'
                                style={{
                                    marginTop: -10,
                                }}
                            >
                                <a href="https://optimism.io" rel="noopener noreferrer">
                                    <div className='quests-card-quests-img-info-company'>
                                        <img src={questsCardCompanyImg} alt="Company Logo"/>
                                        <p>Aave</p>
                                    </div>
                                </a>
                                <a href="https://optimism.io" rel="noopener noreferrer">
                                    <div className='quests-card-quests-img-info-chain'>
                                        <img src={OPChain} alt="Chain Logo Stuff_slide_card"/>
                                    </div>
                                </a>
                            </div>
                        </a>
                    </div>
                )
            })
    );
}

export default Profile;