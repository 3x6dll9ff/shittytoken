// src/pages/Home.js
import React, { createRef, Component } from 'react';
import './css/home.css';
import BackgroundVideo from './components/background_video';
import WhiteLine from './components/white_line';
import Tokenomics from './components/tokenomics';
import Roadmap from './components/roadmap/roadmap';
import Stuff from './components/stuff/stuff';
import Footer from './components/footer';
import PageSwitcher from './components/page_switcher';

class Home extends Component {
    constructor(props) {
        super(props);

        this.whiteLineRefs = [
            createRef(),
            createRef(),
            createRef(),
            createRef(),
            createRef()
        ];


        this.headerHeight = 90; // Высота фиксированного хедера
    }

    getNextWhiteLine = () => {
        for (let i = 0; i < this.whiteLineRefs.length; i++) {
            
            const ref = this.whiteLineRefs[i];

            if (ref.current) {
                // Получаем элемент с помощью ref
                const element = ref.current;
                
                // Получаем размеры и позицию элемента относительно видимого окна
                const rect = element.getBoundingClientRect();
                
                // Расстояние от верхней границы страницы до верхней границы элемента
                const distanceToTop = rect.top + window.scrollY;
                
                // Расстояние от верхней границы страницы до нижней границы видимого окна
                const distanceToBottomOfViewport = window.scrollY + window.innerHeight;
                
                const buffer = window.innerHeight * 0.02
                
                // Возвращаем true, если элемент виден (например, если верхняя граница элемента видна в пределах видимого окна)
                if (distanceToTop - buffer > distanceToBottomOfViewport) {
                    return this.whiteLineRefs[i];
                }
            }
        }

        return this.whiteLineRefs[0];
    }

    scrollToNextWhiteLine = () => {
        const nextWhiteLineRef = this.getNextWhiteLine();
    
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
                behavior: 'instant'
            });
        }
    };
    

    render() {
        return (
            <div className="home-page">
                <PageSwitcher onSwitch={this.scrollToNextWhiteLine}/>
                <BackgroundVideo />
                <WhiteLine ref={this.whiteLineRefs[0]} />
                <Tokenomics />
                <WhiteLine ref={this.whiteLineRefs[1]} />
                <Roadmap />
                <WhiteLine ref={this.whiteLineRefs[2]} />
                <Stuff />
                <WhiteLine ref={this.whiteLineRefs[3]} className='black-line'/>
                <Footer />
            </div>
        );
    }
}

export default Home;
