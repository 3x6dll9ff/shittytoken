// src/components/WhiteLine.js
import React, { forwardRef } from 'react';
import '../css/home.css'; // Подключаем стили

const WhiteLine = forwardRef(({ className }, ref) => {
  return (
    <div ref={ref} className={`white-line ${className ? className : ''}`}>
    </div>
  );
});

export default WhiteLine;
