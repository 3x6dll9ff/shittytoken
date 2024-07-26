import React from "react";
import * as ReactDOMClient from "react-dom/client";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./home";
import Header from "./scripts/header";
import "./css/index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

const mainPath = `/`;

const App = () => {
    return (
        <div className={`body`}>
            <Router>
                <Header/>
                <Routes>
                    <Route path={mainPath} element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
};

root.render(<App/>);
