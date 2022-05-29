import React from 'react';
import { useQuery } from 'react-query';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import Product from './Product';
const Products = () => {
  const { data: products, isLoading } = useQuery('users', () => fetch(`${hostLink()}/product`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));
  if (isLoading) return <Loading />
  return (
    <div className='w-full text-white my-8'>
      <h1 className='text-5xl text-center'>Our Products</h1>
      <div className='w-full p-6 flex flex-col justify-around md:flex-row flex-wrap'>
      {
        products.map(product => <Product key={product._id} product={product}/>)
      }
      </div>
    </div>
  );
};

export default Products;