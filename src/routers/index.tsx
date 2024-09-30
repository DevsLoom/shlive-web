import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layouts/Landing";
import Home from "../pages/(landing)/(home)/page";
import Room from "../pages/(landing)/rooms/[id]/page";
import adminRouters from "./admin";
import authRouters from "./auth";

const routers = createBrowserRouter([
    {
        path: "",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/rooms/:id", element: <Room /> },
        ],
    },

    ...authRouters,
    ...adminRouters,
]);

export default routers;
