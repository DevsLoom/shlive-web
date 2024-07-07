import auth from './auth';
import coinPackages from './coins/coinPackages';
import coinSales from './coins/coinSales';
import rooms from './rooms';
import users from './users';

export const apiReducers = {
  [auth.reducerPath]: auth.reducer,
  [users.reducerPath]: users.reducer,
  [rooms.reducerPath]: rooms.reducer,
  [coinPackages.reducerPath]: coinPackages.reducer,
  [coinSales.reducerPath]: coinSales.reducer,
};

export const apiMiddleWares = [
  auth.middleware,
  users.middleware,
  rooms.middleware,
  coinPackages.middleware,
  coinSales.middleware,
];
