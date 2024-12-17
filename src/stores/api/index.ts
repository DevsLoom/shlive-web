import { adminApiMiddleWares, adminApiReducers } from "./admin";
import auth from "./auth";
import { consumerApiMiddleWares, consumerApiReducers } from "./consumers";
import publics from "./publics";

export const apiReducers = {
    [auth.reducerPath]: auth.reducer,
    [publics.reducerPath]: publics.reducer,
    ...adminApiReducers,
    ...consumerApiReducers,
};

export const apiMiddleWares = [
    auth.middleware,
    publics.middleware,
    ...adminApiMiddleWares,
    ...consumerApiMiddleWares,
];
