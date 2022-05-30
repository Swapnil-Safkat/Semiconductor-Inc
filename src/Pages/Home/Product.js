import React from 'react';
import { useNavigate } from 'react-router-dom';
const Product = ({ product }) => {
  const { _id, name, image, available, price, description, minOrder } = product;
  const navigate = useNavigate();
  const tableClass = 'bg-neutral px-3';
  const spanClass = 'text-white text-base';
  return (
    <div className="card w-full md:w-1/3 p-6 text-gray-100">
      <div className='bg-neutral shadow-xl  rounded-lg'>
        <figure><img className='  rounded-t-lg' src={image} alt={name} /></figure>
        <div className="card-body p-0 flex flex-col justify-between">
          <h2 className="card-title text-center p-4 h-20">
            {name}
          </h2>
          <hr className='w-11/12 mx-auto' />
          <div className="overflow-x-auto w-full">
            <table className="table table-compact w-full text-sm">
              <tbody>
                <tr >
                  <th className={tableClass}>Price</th>
                  <td className={tableClass}><span className={spanClass}>{price}$</span></td>
                </tr>
                <tr>
                  <th className={tableClass}>Available Amount</th>
                  <td className={tableClass}><span className={spanClass}>{available}</span> Piece</td>
                </tr>
                <tr>
                  <th className={tableClass}>Minimum order</th>
                  <td className={tableClass}><span className={spanClass}>{minOrder}</span> Piece</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-actions my-4 w-full flex justify-center items-start">
            <button onClick={() => { navigate(`/purchase/${_id}`) }
            } className="btn btn-secondary">Buy Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;