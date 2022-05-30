import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import Product from './Product';
import { ArrowRightIcon } from '@heroicons/react/solid'
const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useQuery('product', () => fetch(`${hostLink()}/product`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));
  if (isLoading) return <Loading />
  return (
    <div id='products' className='w-full text-white mb-8 mt-20'>
      <h1 className='text-5xl text-center'>Our Products</h1>
      <div className='w-full lg:w-3/4 mx-auto p-6 flex flex-col justify-around md:flex-row flex-wrap'>
      {
        products.map(product => <Product key={product._id} product={product}/>)
      }
      </div>
      <div className="my-4 w-3/4 mx-auto flex justify-end items-start">
            <button onClick={() => { navigate(`/products`) }
            } className="btn btn-secondary">Show All Products<ArrowRightIcon className=' ml-2 w-5'/></button>
          </div>
    </div>
  );
};

export default Products;