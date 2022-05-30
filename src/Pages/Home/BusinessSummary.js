import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import {ChipIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/solid'
import { AnnotationIcon } from '@heroicons/react/solid'
const BusinessSummary = () => {
  const summaryClass = 'p-6';
  const nameClass = 'text-xl md:text-2xl text-center w-full flex mt-2';
  const amountClass = 'text-2xl md:text-3xl text-center';
  const iconClass = 'w-8 mr-2';
  return (
    <div className='w-full text-white my-8'>
      <h1 className='text-2xl md:text-5xl text-center mb-6'>Business Summary</h1>
      <div className='bg-neutral flex flex-col md:flex-row justify-around items-center shadow-xl'>
        <div className={summaryClass}>
          <h1 className={amountClass}>1000+</h1>
          <h1 className={nameClass}><ChipIcon className={iconClass}/>Products</h1>
        </div>
        <div className={summaryClass}>
          <h1 className={amountClass}>200+</h1>
          <h1 className={nameClass}><UserIcon className={iconClass}/>Customers</h1>
        </div>
        <div className={summaryClass}>
          <h1 className={amountClass}>1200+</h1>
          <h1 className={nameClass}><AnnotationIcon className={iconClass}/>Reviews</h1>
        </div>
        <div className={summaryClass}>
          <h1 className={amountClass}>1B+</h1>
          <h1 className={nameClass}><CurrencyDollarIcon className={iconClass}/> Annual Revenue</h1>
        </div>
      </div >
    </div >
  );
};

export default BusinessSummary;