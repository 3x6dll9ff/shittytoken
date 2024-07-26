import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./scripts/header";
import Home from "./home";
import Crypto from "./crypto";
import Quests from "./quests";
import Blog from "./blog";
import "./css/index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const homePath = `/`;
const cryptoPath = `/crypto`;
const questsPath = `/quests`;
const blogPath = `/blog`;

const App = () => {
    return (
        <div className={`body`}>
            <Router>
                <Header/>
                <Routes>
                    <Route path={homePath} element={<Home />}/>
                    <Route path={cryptoPath} element={<Crypto />}/>
                    <Route path={questsPath} element={<Quests />}/>
                    <Route path={blogPath} element={<Blog />}/>
                </Routes>
            </Router>
        </div>
    );
};

root.render(<App/>);
