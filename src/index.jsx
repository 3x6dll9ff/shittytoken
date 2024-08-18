import {Component, useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cookies from "js-cookie";
import userAPI from "./global/scripts/user-api.js";
import Header from "./global/components/header/header.jsx";
import Footer from "./global/components/footer.jsx";
import Home from "./home/page.jsx";
import Crypto from "./crypto/page.jsx";
import Quests from "./quests/page.jsx";
import Blog from "./blog/page.jsx";
import Profile from "./profile/profile.jsx";
import Quest from "./quests/[questId]/page.jsx";

import "./index.css";

import phone from './global/assets/images/phone.png';
import pc from './global/assets/images/pc.png';


const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const questPath = '/quest';
const blogPath = `/blog`;
const profilePath = `/profile`;

let cursorCoordinates = {x: 0, y: 0};
document.addEventListener('mousemove', (event) => {
    cursorCoordinates.x = event.clientX;
    cursorCoordinates.y = event.clientY;
});
const getCursorCoordinates = () => {
    return {...cursorCoordinates};
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
                            {'>'}
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

export default class App extends Component {
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
            <>
                <SmallScreenAlert/>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path={homePath} element={<Home/>}/>
                        <Route path={cryptoPath} element={<Crypto/>}/>
                        <Route path={questsPath} element={<Quests/>}/>
                        <Route path={`${questPath}/:questId`} element={<Quest/>}/>
                        <Route path={blogPath} element={<Blog/>}/>
                        <Route path={profilePath} element={<Profile/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </>
        );
    }
}

export {getCursorCoordinates, homePath, cryptoPath, questsPath, questPath, blogPath, profilePath};
