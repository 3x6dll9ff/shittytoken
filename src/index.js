import React, { useState, useEffect } from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import userAPI from "./scripts/user-auth/user-api";
import Header from "./scripts/header";
import Footer from "./scripts/footer";
import Home from "./home";
import Crypto from "./crypto";
import Quests from "./quests";
import Blog from "./blog";
import Profile from "./profile";
import QuestTasksPage from "./scripts/quests/quest-tasks-page";
import "./css/index.css";
import phone from './assets/images/phone.png';
import pc from './assets/images/pc.png';

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const questPath = '/quest';
const blogPath = `/blog`;
const profilePath = `/profile`;

let cursorCoordinates = { x: 0, y: 0 };
document.addEventListener('mousemove', (event) => {
    cursorCoordinates.x = event.clientX;
    cursorCoordinates.y = event.clientY;
});
const getCursorCoordinates = () => {
    return { ...cursorCoordinates };
};

const SmallScreenAlert = () => {
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const minWidth = 1340;
            const minHeight = 720;

            const isLargeEnough = screenWidth >= minWidth && screenHeight >= minHeight;
            setIsScreenLargeEnough(isLargeEnough);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    if (!isScreenLargeEnough) {
        return (
            <div className={`index-screen-size-warning`}>
                <div className={`index-screen-size-warning-info-container`}>
                    <div className={`index-screen-size-warning-visualised-container`}>
                        <img className={`index-screen-size-warning-image1`} src={phone} alt={`phone`}/>
                        <div className={`index-screen-size-warning-arrow`}>
                            >
                        </div>
                        <img className={`index-screen-size-warning-image2`} src={pc} alt={`pc`}/>
                    </div>
                    <div className={`index-screen-size-warning-text`}>
                        This website is optimized for desktop screens. Please use a larger screen or a device with a
                        larger screen to enjoy the full experience.
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

class App extends React.Component {
    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const tokenIdValidJson = await userAPI.authIsValid(accessToken);
            const tokenIdValid = tokenIdValidJson['is_valid'];
            if (!tokenIdValid) {
                Cookies.remove('access_token');
            }
        }
    }

    render() {
        return (
            <div className={`body`}>
                <SmallScreenAlert />
                <Router>
                    <Header />
                    <Routes>
                        <Route path={homePath} element={<Home />} />
                        <Route path={cryptoPath} element={<Crypto />} />
                        <Route path={questsPath} element={<Quests />} />
                        <Route path={`${questPath}/:questId`} element={<QuestTasksPage />} />
                        <Route path={blogPath} element={<Blog />} />
                        <Route path={profilePath} element={<Profile />} />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        );
    }
}

root.render(<App />);

export { getCursorCoordinates, homePath, cryptoPath, questsPath, questPath, blogPath, profilePath };
