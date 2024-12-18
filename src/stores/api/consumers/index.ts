import rooms from "./rooms";

export const consumerApiReducers = {
    [rooms.reducerPath]: rooms.reducer,
};

export const consumerApiMiddleWares = [rooms.middleware];
