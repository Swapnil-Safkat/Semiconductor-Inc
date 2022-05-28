import React from 'react';

const Loading = () => {
  return (
    <div className='w-full my-auto'>
      <div className="mx-auto flex justify-center">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;