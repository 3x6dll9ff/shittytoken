import React from 'react';
import '../css/home.css'; // Подключаем стили
import arrow from '../assets/images/arrow1.png'; // Импортируем SVG как React-компонент

const PageSwitcher = ({ onSwitch }) => {
    return (
        <div className='page-switcher' onClick={onSwitch}>
            <img src={arrow} alt='switcher'></img>
        </div>
    );
}

export default PageSwitcher;
