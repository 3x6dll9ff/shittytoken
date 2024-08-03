import React, { createRef, Component } from 'react';
import BackgroundVideo from './scripts/home/background_video';
import WhiteLine from './scripts/home/white_line';
import Tokenomics from './scripts/home/tokenomics';
import Roadmap from './scripts/home/roadmap/roadmap';
import Stuff from './scripts/home/stuff/stuff';
import Footer from './scripts/home/footer';
import PageSwitcher from './scripts/home/page_switcher';
import './css/home/home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.secondWhiteLine = createRef();

        this.headerHeight = 90; // Высота фиксированного хедера
    }


    scrollToSecondWhiteLine = () => {
        const nextWhiteLineRef = this.secondWhiteLine
    
        if (nextWhiteLineRef && nextWhiteLineRef.current) {
            console.log(nextWhiteLineRef);
            console.log(nextWhiteLineRef.current);
            const element = nextWhiteLineRef.current;
            const rect = element.getBoundingClientRect();
            const offsetTop = window.scrollY || document.documentElement.scrollTop;
    
            // Вычислить положение, где верхняя граница элемента окажется снизу видимой области
            const scrollPosition = rect.top + offsetTop - window.innerHeight;
    
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };
    

    render() {
        return (
            <div className="home-page">
                <PageSwitcher onSwitch={this.scrollToSecondWhiteLine}/>
                <BackgroundVideo />
                <WhiteLine />
                <Tokenomics />
                <WhiteLine ref={this.secondWhiteLine} />
                <Roadmap />
                <WhiteLine />
                <Stuff />
                <WhiteLine className='black-line'/>
                <Footer />
            </div>
        );
    }
}

export default Home;
