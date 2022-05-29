import React from 'react';
import { useNavigate } from 'react-router-dom';
const Product = ({ product }) => {
  const { _id, name, image, available, price, description, minOrder } = product;
  const navigate = useNavigate();
  return (
    <div className="card w-full md:w-1/3 p-6 text-gray-100">
      <div className='bg-neutral shadow-xl '>
        <figure><img src={image} alt={name} /></figure>
        <div className="card-body">
          <h2 className="card-title text-center">
            {name}
          </h2>
          <hr />
          <h1 className='text-lg text-center'>Price: <span className='text-primary'>{price}$</span></h1>
          <h1 className='text-lg text-center'>Available Amount: <span className='text-primary'>{available}</span> Piece </h1>
          <h1 className='text-lg text-center'>Minimum order: <span className='text-primary'>{minOrder}</span> Piece</h1>
          <h1 className='text-sm text-start my-4'>{description.substring(0, 100) + '...'}</h1>
          <div className="card-actions  w-full flex justify-center items-start">
            <button onClick={() => { navigate(`/purchase/${_id}`) }
            } className="btn btn-secondary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;