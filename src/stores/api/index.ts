import { adminApiMiddleWares, adminApiReducers } from "./admin";
import auth from "./auth";

export const apiReducers = {
    [auth.reducerPath]: auth.reducer,
    ...adminApiReducers,
};

export const apiMiddleWares = [auth.middleware, ...adminApiMiddleWares];
