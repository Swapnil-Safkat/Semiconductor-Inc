import React from 'react';
import BusinessSummary from './BusinessSummary';
import ContactUs from './ContactUs';
import DiscountedProducts from './DiscountedProducts';
import Footer from './Footer';
import HomeBanner from './HomeBanner';
import Products from './Products';

const Home = () => {
  return (
    <div className='h-screen' >
      <HomeBanner />
      <Products />
      <DiscountedProducts />
      <BusinessSummary />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;