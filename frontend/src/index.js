import React, {useState} from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
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
const questTasksPage = "/quest-tasks-page"

const App = () => {
    const [clientCursorCoordinates, setClientCursorCoordinates] = useState({x: 0, y: 0})

    const handlePointerMove = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setClientCursorCoordinates({x, y});
    };

    return (
        <div
            className={`body`}
            onPointerMove={handlePointerMove}
        >
            <Router>
                <Header clientCursorCoordinates={clientCursorCoordinates}/>
                <Routes>
                    <Route path={homePath} element={<Home />}/>
                    <Route path={cryptoPath} element={<Crypto />}/>
                    <Route path={questsPath} element={<Quests />}/>
                    <Route path={blogPath} element={<Blog />}/>
                    <Route path={profilePath} element={<Profile />}/>
                    <Route path="/quest-tasks-page/:questId" element={<QuestTasksPage />} />
                </Routes>
                <Footer/>
            </Router>
        </div>
    );
};

root.render(<App/>);
