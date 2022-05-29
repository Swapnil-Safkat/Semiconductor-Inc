import React from 'react';
import BusinessSummary from './BusinessSummary';
import HomeBanner from './HomeBanner';

const Home = () => {
  return (
    <div className='h-screen' >
      <HomeBanner />
      <BusinessSummary/>
    </div>
  );
};

export default Home;