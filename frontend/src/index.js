import React, {useState} from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./scripts/header";
import Home from "./home";
import Crypto from "./crypto";
import Quests from "./quests";
import Blog from "./blog";
import Profile from "./profile";
import "./css/index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const blogPath = `/blog`;
const profilePath = `/profile`;

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
                </Routes>
            </Router>
        </div>
    );
};

root.render(<App/>);
