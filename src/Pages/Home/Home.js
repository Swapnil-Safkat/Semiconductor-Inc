import React from 'react';
import BusinessSummary from './BusinessSummary';
import Footer from './Footer';
import HomeBanner from './HomeBanner';
import Products from './Products';

const Home = () => {
  return (
    <div className='h-screen' >
      <HomeBanner />
      <Products />
      <BusinessSummary />
      <Footer />
    </div>
  );
};

export default Home;