import React, { useState, useEffect, useRef } from 'react';
import '../css/home.css'; // Подключаем стили
import arrow from '../assets/images/arrow1.png'; // Импортируем изображение стрелочки

const PageSwitcher = ({ onSwitch, lastWhiteLineRef  }) => {
    const [isVisible, setIsVisible] = useState(true);
    const arrowRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const lastWhiteLine = document.querySelector('.white-line.black-line');
            const distanceFromTopToLineBottom = lastWhiteLine.getBoundingClientRect().bottom + window.scrollY;
            console.log('distanceFromTopToLineBottom', distanceFromTopToLineBottom)

            if (arrowRef.current) {
                const distanceFromTopToArrowBottom = window.scrollY + arrowRef.current.getBoundingClientRect().bottom;

                if (distanceFromTopToLineBottom <= distanceFromTopToArrowBottom) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Для начальной проверки видимости

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div 
            className={`page-switcher ${isVisible ? '' : 'hidden'}`} 
            onClick={onSwitch}
            ref={arrowRef}
        >
            <img src={arrow} alt='switcher' />
        </div>
    );
}

export default PageSwitcher;
