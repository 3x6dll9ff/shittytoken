import React from 'react';
import './css/home.css';
import BackgroundVideo from './components/background_video';
import WhiteLine from './components/white_line';
import Tokenomics from './components/tokenomics';
import Roadmap from './components/roadmap/roadmap';
import Stuff from './components/stuff/stuff';
import Footer from './components/footer';


class Home extends React.Component {
    render() {
        return (
            <div className="home-page">
                <BackgroundVideo />
                <WhiteLine />
                <Tokenomics />
                <WhiteLine />
                <Roadmap />
                <WhiteLine />
                <Stuff />
                <Footer />
            </div>
        );
    }
}

export default Home;