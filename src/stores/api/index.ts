import { adminApiMiddleWares, adminApiReducers } from "./admin";
import auth from "./auth";
import { consumerApiMiddleWares, consumerApiReducers } from "./consumers";

export const apiReducers = {
    [auth.reducerPath]: auth.reducer,
    ...adminApiReducers,
    ...consumerApiReducers,
};

export const apiMiddleWares = [
    auth.middleware,
    ...adminApiMiddleWares,
    ...consumerApiMiddleWares,
];
