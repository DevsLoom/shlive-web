'use client';

import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../stores/reducers/auth';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('authToken') || null;
    if (token) {
      const decodedToken = decodeToken(token);
      const isExpire = isExpired(token);
      if (!isExpire) {
        dispatch(
          setCurrentUser({
            token: token,
            currentUser: decodedToken,
            isAuthenticate: true,
          })
        );
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
