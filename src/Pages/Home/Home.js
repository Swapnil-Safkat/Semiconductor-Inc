import React from 'react';
import BusinessSummary from './BusinessSummary';
import HomeBanner from './HomeBanner';
import Products from './Products';

const Home = () => {
  return (
    <div className='h-screen' >
      <HomeBanner />
      <Products/>
      <BusinessSummary/>
    </div>
  );
};

export default Home;