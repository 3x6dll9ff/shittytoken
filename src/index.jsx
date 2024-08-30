import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SmallScreenAlert from "./global/components/small-screen-alert/component.jsx";
import Header from "./global/components/header/component.jsx";
import Footer from "./global/components/footer/component.jsx";
import Home from "./home/page.jsx";
import Crypto from "./crypto/page.jsx";
import Quests from "./quests/page.jsx";
import Quest from "./quests/[questId]/page.jsx";
import Blog from "./blog/page.jsx";
import Profile from "./profile/page.jsx";
import SeasonPass from "./season-pass/page.jsx";

import "./index.css";
import "./global/css/fonts.css";


const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const blogPath = `/blog`;
const profilePath = `/profile`;
const seasonPassPath = `/season-pass`;

const questsParams = 'questId';

let cursorPosition = {x: 0, y: 0};
document.addEventListener('mousemove', (event) => {
    cursorPosition.x = event.clientX;
    cursorPosition.y = event.clientY;
});
const getCursorPosition = () => {
    return {...cursorPosition};
};

export default class App extends Component {
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
                        <Route path={`${questsPath}/:${questsParams}`} element={<Quest/>}/>
                        <Route path={blogPath} element={<Blog/>}/>
                        <Route path={profilePath} element={<Profile/>}/>
                        <Route path={seasonPassPath} element={<SeasonPass/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </>
        );
    }
}

export {
    getCursorPosition,
    homePath, cryptoPath, questsPath, blogPath, profilePath, seasonPassPath,
    questsParams,
};
