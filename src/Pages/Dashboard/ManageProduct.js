import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';
import DeleteConfirm from './DeleteConfirm';

const ManageProduct = () => {
  const { data: products, isLoading, isError, refetch } = useQuery('users', () => fetch(`${hostLink()}/products`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  if (isLoading) return <Loading />
  if (isError) {
    toast.error('Loading failed! try again');
  }
  return (
    <div>
      <div className="overflow-x-auto w-11/12 mx-auto text-gray-100">
        <h1 className='text-4xl my-4'>Manage Products</h1>
        <table className="table table-compact sm:table-normal table-zebra w-full shadow-lg text-center">
          <thead>
            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Name</th>
              <th>Available Amount</th>
              <th>Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody >
            {
              products.map((product, index) => <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-8 sm:w-12 hover:scale-150 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                      <img alt='avatar' src={product?.image} />
                    </div>
                  </div>
                </td>
                <td>{product?.name}</td>
                <td>{product?.available}</td>
                <td>{product?.price}</td>
                <td>
                  <label onClick={() => { setDeleteConfirm(product) }
                  } htmlFor="delete-confirm" className="btn modal-button">Remove</label>

                </td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {deleteConfirm && <DeleteConfirm refetch={refetch} product={deleteConfirm} setProduct={setDeleteConfirm} />}
    </div>
  );
};

export default ManageProduct;