import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layouts/Landing";
import Home from "../pages/(landing)/(home)/page";
import DynamicPage from "../pages/(landing)/pages/[slug]/page";
import adminRouters from "./admin";
import authRouters from "./auth";

const routers = createBrowserRouter([
    {
        path: "",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/pages/:slug", element: <DynamicPage /> },
        ],
    },

    ...authRouters,
    ...adminRouters,
]);

export default routers;
