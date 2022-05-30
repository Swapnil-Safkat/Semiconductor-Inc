import React from 'react';
import { useQuery } from 'react-query';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import Product from './Product';
import { ArrowRightIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';
import { FireIcon } from '@heroicons/react/solid'


const DiscountedProducts = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery('Discounted Products', () => fetch(`${hostLink()}/discountedProducts`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));
  console.log();
  if (isLoading) return <Loading />
  return (
    <div id='products' className='w-full text-white mb-8 mt-20'>
      <div className='flex flex-row justify-center items-center'>
        <h1 className='text-5xl text-center inline'>Hot Discounts</h1> <FireIcon className='mt-2 ml-2 w-10' />
      </div>
      <div className='w-full lg:w-3/4 mx-auto p-6 flex flex-col justify-around md:flex-row flex-wrap'>
        {
          products.map(product => <Product key={product._id} product={product} />)
        }
      </div>
      <div className="my-4 w-3/4 mx-auto flex justify-end items-start">
        <button onClick={() => { navigate(`/products`) }
        } className="btn btn-secondary">Show All Products<ArrowRightIcon className=' ml-2 w-5' /></button>
      </div>
    </div>
  );
};

export default DiscountedProducts;