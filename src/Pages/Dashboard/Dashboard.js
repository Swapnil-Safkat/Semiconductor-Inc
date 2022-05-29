import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import Loading from '../../Components/Loading';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [admin] = useAdmin(user);

  if (loading) return <Loading />
  return (
    <div className="drawer drawer-mobile min-h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-neutral">
        <div className='py-3  sticky top-36'>
          <label htmlFor="my-drawer-2" className="btn btn-accent rounded-r-full py-0 px-2 drawer-button lg:hidden">{'>'}</label>
        </div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu pr-4 py-1 overflow-y-auto w-56 bg-base-100 text-base-content">
          <li ><NavLink className='rounded-r-full' to='/dashboard'>Profile</NavLink></li>
          {admin ? <>
            <li><NavLink to='/dashboard/all-users'>All Users</NavLink></li>
            <li><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
            <li><NavLink to='/dashboard/manage-product'>Manage Products</NavLink></li>
          </> : <>
            <li ><NavLink className='rounded-r-full' to='/dashboard/my-orders'>Orders</NavLink></li>
            <li ><NavLink className='rounded-r-full' to='/dashboard/add-review'>Add a Review</NavLink></li>
          </>}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;