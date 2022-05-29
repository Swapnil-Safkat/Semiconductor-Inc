import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import hostLink from '../../Components/host';
import Loading from '../../Components/Loading';

const AllUsers = () => {
  const { data: users, isLoading, isError, refetch } = useQuery('users', () => fetch(`${hostLink()}/users`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  }).then(res => res.json()));


  const changeAdmin = (email, role) => {
    console.log(role);
    fetch(`${hostLink()}/user/admin/${email}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ role })
    }).then(res => {
      if (res.status === 403) {
        toast.error('Failed to make an admin');
      }
      return res.json()
    }).then(data => {
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Made User Admin!");
        refetch();
      }
    })
  };
  if (isLoading) return <Loading />
  if (isError) return <h1>Error Occurred</h1>
  return (
    <div>
      <div className="overflow-x-auto w-11/12 mx-auto text-gray-100">
        <h1 className='text-4xl my-4'>All Users</h1>
        <table className="table table-zebra w-full shadow-lg">
          <thead>
            <tr>
              <th>Index</th>
              <th>Email</th>
              <th>Admin Role</th>
              <th>Remove Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((a, index) => <tr>
                <th>{index + 1}</th>
                <td>{a.email}</td>
                <td>
                  {a?.role === 'admin' ? 'Admin' :
                    <button onClick={() => { changeAdmin(a.email, 'admin') }
                    } className='btn btn-xs text-gray-100'>Make Admin</button>

                  }</td>
                <td><button onClick={() => { changeAdmin(a.email, 'user') }} className='btn btn-xs text-gray-100'>Remove Admin</button></td>
              </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;