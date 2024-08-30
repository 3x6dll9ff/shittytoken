import {Component, useState} from "react";
import Cookies from "js-cookie";
import {homePath} from "../index.jsx";
import LoadingScreen from "../global/components/loading-screen/component.jsx";
import SettingsPopup from "../global/components/settings-popup/component.jsx";
import QuestCard from "../global/components/quest-card/component.jsx";
import ProgressBar from "../global/components/progress-bar/component.jsx";
import Pentagon, {countPentagonWidth} from "../global/components/pentagon/component.jsx";
import userAPI from "../global/scripts/user-api.js";
import {formatUsername, formatWalletAddress, formatDatetime} from "../global/scripts/utils.js";

import "./css/profile.css";

import docImage from "../global/assets/images/docs-icon.png";
import LastAchievementAvatar from "./assets/images/pixel-syringe.png";

import questCard1QuestPic from "../quests/assets/images/quests-cards-pics/quest-card-1-quest-pic.jpg";
import company1CardPic from "../quests/assets/images/company-pics/company-1-card-pic.png";
import chain1ChainPic from "../quests/assets/images/chains-pics/op-chain.png";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {userAccount: null};
    }

    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (!accessToken) {
            window.location.href = homePath;
        } else {
            const userAccount = await userAPI.getUser(accessToken);
            this.setState({userAccount});
        }
    }

    render() {
        const {userAccount} = this.state;

        if (!userAccount) {
            return <LoadingScreen/>;
        } else {
            return (
                <div className={`profile-main-container`}>
                    <IDCard userAccount={userAccount}/>
                    <SeasonPass userAccount={userAccount}/>
                    <Achievements userAccount={userAccount}/>
                    <Quests userAccount={userAccount}/>
                </div>
            );
        }
    }
}

const ProfileInblockHeader = ({className, titleType = 'big', title, buttonText, onButtonClick}) => {
    const titleTypes = {
        big: 'big',
        small: 'small',
        default: 'big',
    }

    let style;
    if (className === undefined) {
        style = {
            width: '100%',
            height: '40px'
        };
    } else {
        style = {};
    }

    return (
        <div
            className={className}
            style={style}
        >
            <div className={`profile-inblock-header ${titleTypes[titleType]}`}>
                <h1>{title}</h1>
                {buttonText && (
                    <button
                        className={`white-button`}
                        onClick={onButtonClick ? onButtonClick : null}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}

const IDCard = ({userAccount}) => {
    const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);

    const userAvatar = userAccount['avatar'];
    const username = userAccount['username'];
    const userAddress = userAccount['wallets'][0]['web3_address'];
    const userMaxDocs = userAccount['max_docs_streak'];
    const totalUserExperience = userAccount['experience'];
    const maxLevelExperience = 5000;
    const userRegisteredAt = userAccount['registered_at'];

    const onEditButtonClick = () => {
        setSettingsPopupVisible(true);
    };

    const onSettingsPopupClose = () => {
        setSettingsPopupVisible(false);
    }

    return (
        <>
            <SettingsPopup
                visible={settingsPopupVisible}
                onClose={onSettingsPopupClose}
            />
            <div className={`profile-id-card-container`}>
                <ProfileInblockHeader
                    title={`ID CARD`}
                    buttonText={`Edit`}
                    onButtonClick={onEditButtonClick}
                />
                <div className={`profile-id-card-user-info`}>
                    <img
                        className={`profile-id-card-user-avatar`}
                        src={userAvatar}
                        alt={`Avatar`}
                    />
                    <div className={`profile-id-card-user-texts-counters`}>
                        <div className={`profile-id-card-user-texts`}>
                            <h1>{formatUsername(username)}</h1>
                            <h2>{formatWalletAddress(userAddress)}</h2>
                        </div>
                        <div className={`profile-id-card-user-counters`}>
                            <div className={`profile-id-card-user-counter`}>
                                <h1>Docs</h1>
                                <div>
                                    <img
                                        src={docImage}
                                        alt={`Icon`}
                                    />
                                    <h2>{userMaxDocs}</h2>
                                </div>
                            </div>
                            <div className={`profile-id-card-user-counter`}>
                                <h1>Quests</h1>
                                <div>
                                    <img
                                        src={docImage}
                                        alt={`Icon`}
                                    /> {/*TODO: заменить на картинку для квестов*/}
                                    <h2>0</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserLevel
                    totalUserExperience={totalUserExperience}
                    maxLevelExperience={maxLevelExperience}
                />
                <div className={`profile-id-card-user-joined-date`}>
                    <h1>Joined {formatDatetime(userRegisteredAt)}</h1>
                </div>
            </div>
        </>
    );
};

const UserLevel = ({totalUserExperience, maxLevelExperience}) => {
    const pentagonHeight = 50
    const pentagonWidth = countPentagonWidth(pentagonHeight)
    const currentUserExperience = totalUserExperience % maxLevelExperience;
    const userLevel = 1 + Math.floor(totalUserExperience / maxLevelExperience);

    return (
        <div className={`profile-id-card-user-level`}>
            <ProgressBar
                className={`profile-progress-bar id-card`}
                currentValue={currentUserExperience}
                maxValue={maxLevelExperience}
                style={{
                    width: `calc(100% - ${pentagonWidth / 2}px)`,
                    left: `${pentagonHeight / 2}px`
                }}
            />
            <Pentagon
                className={`profile-id-card-user-level-number`}
                text={userLevel}
                fontSize={22}
            />
            <h1 className={`profile-id-card-user-level-experience`}>
                {currentUserExperience} / {maxLevelExperience} xp
            </h1>
        </div>
    );
};

const SeasonPass = ({userAccount}) => {
    const pentagonBorderSize = 4;
    const smallPentagonHeight = 75;
    const smallPentagonWidth = countPentagonWidth(smallPentagonHeight);

    return (
        <div className={`profile-season-pass-container`}>
            <ProfileInblockHeader title={`SEASON PASS`}/>
            <div className={`profile-season-pass-block`}>
                <div className={`profile-season-pass-block-left`}>
                    <ProgressBar
                        className={`profile-progress-bar season-pass`}
                        currentValue={50}
                        maxValue={100}
                        style={{
                            width: `calc(100% - ${smallPentagonWidth}px)`,
                            left: `${smallPentagonWidth / 2}px`
                        }}
                    />
                    <Pentagon
                        className={`profile-season-pass-block-left-pentagon left`}
                        text={1}
                        fontSize={35}
                        height={smallPentagonHeight}
                        borderSize={pentagonBorderSize}
                    />
                    <Pentagon
                        className={`profile-season-pass-block-left-pentagon center`}
                        text={2}
                        fontSize={50}
                        color={`white`}
                        borderSize={pentagonBorderSize}
                    />
                    <Pentagon
                        className={`profile-season-pass-block-left-pentagon right`}
                        text={3}
                        fontSize={35}
                        height={smallPentagonHeight}
                        effect={`disabled`}
                        borderSize={pentagonBorderSize}
                    />
                </div>
                <div className={`profile-season-pass-block-right`}>
                    <h1>Collect your reward!</h1>
                    <button className={`white-button`}>
                        Claim
                    </button>
                </div>
            </div>
        </div>
    );
};

const Achievements = ({userAccount}) => {
    return (
        <div className={`profile-achievements-container`}>
            <ProfileInblockHeader
                className={`profile-container-title`}
                title={`ACHIEVEMENTS`}
            />
            <div className={`profile-achievements-block`}>
                <div className={`profile-achievements-block-part`}>
                    <ProfileInblockHeader
                        titleType={'small'}
                        title={`Last:`}
                    />
                    <Achievement/>
                </div>
                <div className={`profile-achievements-block-part`}>
                    <ProfileInblockHeader
                        titleType={'small'}
                        title={`Unlocked:`}
                    />
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                    <Achievement/>
                </div>
                <div className={`profile-achievements-block-part`}>
                    <ProfileInblockHeader
                        titleType={'small'}
                        title={`Locked:`}
                    />
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                    <Achievement locked={true}/>
                </div>
            </div>
        </div>
    );
};

const Achievement = ({locked}) => {
    return (
        <div className={`profile-achievement-container ${locked ? 'locked' : ''}`}>
            <div className={`profile-achievement-info`}>
                <img
                    src={LastAchievementAvatar}
                    alt={`Icon`}
                />
                <div className={`profile-achievement-header-desc`}>
                    <h1>Injection</h1>
                    <h2>Complete the first quest.</h2>
                </div>
            </div>
            <h3>300 <br/> xp</h3>
        </div>
    );
}

const Quests = ({userAccount}) => {
    return (
        <div className={`profile-completed-quests-container`}>
            <ProfileInblockHeader
                className={`profile-container-title`}
                title={`COMPLETED QUESTS`}
            />
            <div className={`profile-completed-quests-block`}>
                <Slides/>
            </div>
        </div>
    );
};

const Slides = () => {
    const questInfo = {
        id: 1,
        image: questCard1QuestPic,
        title: 'Quest title for tests here',
        tasks: 10,
        xp: 1000,
        project: {
            image: company1CardPic,
            name: 'Project D'
        },
        chain: {
            image: chain1ChainPic
        }
    };

    return (
        Array.from({length: 6})
            .map((_, index) => {
                return (
                    <QuestCard questInfo={questInfo}/>
                )
            })
    );
};

export default Profile;