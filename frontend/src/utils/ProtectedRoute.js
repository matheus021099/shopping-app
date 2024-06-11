import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/jwt';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      navigate('/login');
    }
  }, [navigate]);

  return <Component {...rest} />;
};

export default ProtectedRoute;

