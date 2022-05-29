import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import { signOut } from 'firebase/auth';
import hostLink from './host';

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    if (user) {
      fetch(`${hostLink()}/user/${user.email}`, {
        method: 'GET',
        headers: {
          'authorization': `bearer ${localStorage.getItem('accessToken')}`
        }
      }).then(res => res.json()).then(result => setProfile(result));
    }
  }, [user])


  const menuItems =
    <>
      <li><NavLink to='/home'>Home</NavLink></li>
      {
        user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      }
      <li><NavLink to='/reviews'>Reviews</NavLink></li>
      <li><NavLink to='/contact'>Contact Us</NavLink></li>
      <li><NavLink to='/about'>About</NavLink></li>
      <li>{user ? <>
        <div className="avatar">
          <div className="w-8 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
            <img alt='avatar' src={profile.img || user.photoURL || "https://api.lorem.space/image/face?hash=64318"} />
          </div>
          <h1>{user.displayName}</h1>
        </div>
        <button onClick={() => {
          signOut(auth);
          localStorage.removeItem('accessToken');
          navigate('/login');
        }} className='btn btn-ghost h-full font-semibold'>Sign Out</button></> : <NavLink to='/login'>Login</NavLink>}</li>
    </>
  return (
    <div className="navbar bg-primary sticky top-0 z-50 ">
      <div className="navbar-start w-full mx-auto">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to='/' className="btn btn-ghost normal-case text-xl text-white p-0">Semiconductor Inc</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 text-gray-100">
          {menuItems}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;