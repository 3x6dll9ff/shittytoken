import {Component, useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Cookies from "js-cookie";
import userAPI from "./global/scripts/user-api.js";
import SmallScreenAlert from "./global/components/small-screen-alert/component.jsx";
import Header from "./global/components/header/component.jsx";
import Footer from "./global/components/footer/component.jsx";
import Home from "./home/page.jsx";
import Crypto from "./crypto/page.jsx";
import Quests from "./quests/page.jsx";
import Blog from "./blog/page.jsx";
import Profile from "./profile/profile.jsx";
import Quest from "./quests/[questId]/page.jsx";

import "./index.css";
import "./global/css/fonts.css";


const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const blogPath = `/blog`;
const profilePath = `/profile`;

let cursorPosition = {x: 0, y: 0};
document.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
});
const getCursorPosition = () => {
    return {...cursorPosition};
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
                        <Route path={`${questsPath}/:questId`} element={<Quest/>}/>
                        <Route path={blogPath} element={<Blog/>}/>
                        <Route path={profilePath} element={<Profile/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </>
        );
    }
}

export {getCursorPosition, homePath, cryptoPath, questsPath, blogPath, profilePath};
