import React, {createRef, forwardRef} from 'react';
import MainSlide from './scripts/home/main_slide';
import TokenomicsSlide from './scripts/home/tokenomics_slide';
import RoadmapSlide from './scripts/home/roadmap/roadmap';
import Stuff from './scripts/home/stuff/stuff';
import SlideSwitcher from './scripts/home/slide_switcher';
import './css/home/home.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.secondWhiteLine = createRef();
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
                <SlideSwitcher onSwitch={this.scrollToSecondWhiteLine}/>
                <MainSlide />
                <SlideSeparator />
                <TokenomicsSlide />
                <SlideSeparator ref={this.secondWhiteLine} />
                <RoadmapSlide />
                <SlideSeparator />
                <Stuff />
            </div>
        );
    }
}

const SlideSeparator = forwardRef(({ className }, ref) => {
    return (
        <div ref={ref} className={`white-line ${className ? className : ''}`}>
        </div>
    );
});

export default Home;
