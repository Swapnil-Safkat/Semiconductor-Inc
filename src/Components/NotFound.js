import React from 'react';
import neon from './neon-error.png';

const NotFound = () => {
  return (
    <div className="carousel h-screen w-full bg-[#090907] flex items-center justify-center overflow-x-hidden">
    <div id="slide1" className="carousel-item relative w-full md:w-2/4 h-full">
      <img src={neon} alt='error 404' className="w-full brightness-150 " />
    </div>
  </div>

  );
};

export default NotFound;