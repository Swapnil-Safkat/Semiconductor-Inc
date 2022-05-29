import React from 'react';

const HomeBanner = () => {
  return (
    <div className="carousel h-2/3 w-full">
      <div id="slide1" className="carousel-item relative w-full h-full">
        <img src="https://www.nxp.com/assets/images/en/banners/BANNER-MOTOR-CONTROL-BROCHURE-HOMEPAGE.jpg" alt='motor control' className="w-full brightness-50 overflow-x-hidden" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle mr-2">❮</a>
          <div className=' h-full flex flex-col justify-center items-center w-full sm:w-1/2'>
            <h1 className='text-5xl text-white mb-3'>Semiconductor Chip for Industrial and IoT Applications</h1>
            <h1 className='text-lg text-white'>Discover our modern semiconductor chip solutions designed to enhance operational safety and efficiency across factory and building automation applications.</h1>
            <div className='w-full flex items-start mt-4'>
              <button className="btn btn-outline text-white">Find Products</button>
            </div>
          </div>
          <a href="#slide2" className="btn btn-circle ml-2">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full h-full">
        <img src="https://thumbs.dreamstime.com/b/semiconductor-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-87915131.jpg" className="w-full brightness-50" alt='semiconductor' />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle mr-2">❮</a>
          <div className=' h-full flex flex-col justify-center items-center w-1/2'>
            <h1 className='text-5xl text-white mb-3'>Best Quality Product For Your Project</h1>
            <h1 className='text-lg text-white'>We garuntee you the best quality product possible in the market, made out of the best quality material with our own nano technology.</h1>
            <div className='w-full flex items-start mt-4'>
              <button className="btn btn-outline text-white">Find Products</button>
            </div>
          </div>
          <a href="#slide1" className="btn btn-circle mr-2">❯</a>
        </div>
      </div>
    </div>
    // <div className="hero w-full py-20 md:py-32 bg-[url('https://www.nxp.com/assets/images/en/banners/BANNER-MOTOR-CONTROL-BROCHURE-HOMEPAGE.jpg')]">
    //   <div className="hero-content w-full md:mx-8 flex-col lg:flex-row-reverse">
    //     {/* <img src={chairImg} alt='' className="rounded-lg shadow-2xl md:mb-6 w-full md:w-1/2" /> */}
    //     <div className='w-full md:w-1/2'>
    //       <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
    //       <p className="pt-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
    //       <Button>Get Started</Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HomeBanner;