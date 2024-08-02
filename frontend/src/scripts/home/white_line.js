import React, { forwardRef } from 'react';
import '../../css/home/home.css';

const WhiteLine = forwardRef(({ className }, ref) => {
  return (
    <div ref={ref} className={`white-line ${className ? className : ''}`}>
    </div>
  );
});

export default WhiteLine;
