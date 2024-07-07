'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../stores';
import AuthProvider from '../providers/auth';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default BaseLayout;
