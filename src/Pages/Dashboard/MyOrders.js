import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import hostLink from '../../Components/host';
import auth from '../../Firebase.init';

import { toast } from 'react-toastify';
const MyOrders = () => {
  const [user] = useAuthState(auth);
  const { data: orders, isLoading, isError, refetch } = useQuery('orders', () => fetch(`${hostLink()}/orders?email=${user?.email}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));
  const payment = () => {
    toast.success("Payment Successful")

  };
  return (
    <div>
      <div className="overflow-x-auto w-11/12 mx-auto text-gray-100">
        <h1 className='text-4xl my-4'>Orders</h1>
        <table className="table table-zebra w-full shadow-lg">
          <thead>
            <tr>
              <th>Index</th>
              <th>Email</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((a, index) => <tr>
                <th>{index + 1}</th>
                <td>{a.email}</td>
                <td>{a.name}</td>
                <td>{a.amount}</td>
                <td><button onClick={() => { payment() }
                } className='btn btn-xs text-gray-100'>Pay</button></td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;