import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const blogPath = `/blog`;
const profilePath = `/profile`;
const questTasksPage = '/quest-tasks-page';

let cursorCoordinates = {x: 0, y: 0};
document.addEventListener('mousemove', (event) => {
    cursorCoordinates.x = event.clientX;
    cursorCoordinates.y = event.clientY;
});
const getCursorCoordinates = () => {
    return {...cursorCoordinates}
};

class App extends React.Component {
    async componentDidMount() {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            const tokenIdValidJson = await userAPI.authIsValid(accessToken)
            const tokenIdValid = tokenIdValidJson['is_valid'];
            if (!tokenIdValid) { Cookies.remove('access_token'); }
        }
    }

    render () {
        return (
            <div className={`body`}>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path={homePath} element={<Home/>}/>
                        <Route path={cryptoPath} element={<Crypto/>}/>
                        <Route path={questsPath} element={<Quests/>}/>
                        <Route path={blogPath} element={<Blog/>}/>
                        <Route path={profilePath} element={<Profile/>}/>
                        <Route path={`${questTasksPage}/:questId`} element={<QuestTasksPage/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </div>
        );
    }
}

root.render(<App/>);

export default getCursorCoordinates;