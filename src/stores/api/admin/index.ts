import coinPackages from "./coins/coinPackages";
import coinSales from "./coins/coinSales";
import coinGiftPackages from "./coins/giftPackages";
import reports from "./reports";
import rooms from "./rooms";
import users from "./users";

export const adminApiReducers = {
    [users.reducerPath]: users.reducer,
    [rooms.reducerPath]: rooms.reducer,
    [coinPackages.reducerPath]: coinPackages.reducer,
    [coinSales.reducerPath]: coinSales.reducer,
    [coinGiftPackages.reducerPath]: coinGiftPackages.reducer,
    [reports.reducerPath]: reports.reducer,
};

export const adminApiMiddleWares = [
    users.middleware,
    rooms.middleware,
    coinPackages.middleware,
    coinSales.middleware,
    coinGiftPackages.middleware,
    reports.middleware,
];
