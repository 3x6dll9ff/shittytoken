import React from 'react';
import './css/home.css';
import BackgroundVideo from './components/background_video';
import WhiteLine from './components/white_line';
import Tokenomics from './components/tokenomics';


class Home extends React.Component {
    render() {
        return (
            <div className="home-page">
                <BackgroundVideo />
                <WhiteLine />
                <Tokenomics />
                <WhiteLine />
            </div>
        );
    }
}

export default Home;