import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../Firebase.init';
import Loading from './Loading';

const RequiredAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if(loading) return <Loading/>

  if (!user) return <Navigate to={'/login'} state={{ from: location }}></Navigate>
  else return children;
};

export default RequiredAuth;