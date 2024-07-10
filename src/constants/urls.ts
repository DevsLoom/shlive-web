export const BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;
export const API_URL = BASE_URL + "/api/v1";

export const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
