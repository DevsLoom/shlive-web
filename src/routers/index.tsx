import { createBrowserRouter } from "react-router-dom";
import LandingLayout from "../layouts/Landing";
import Home from "../pages/(landing)/(home)/page";
import Room from "../pages/(landing)/rooms/[id]/page";
import Rooms from "../pages/(landing)/rooms/page";
import AgoraProvider from "../providers/agora";
import adminRouters from "./admin";
import authRouters from "./auth";

const routers = createBrowserRouter([
    {
        path: "",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/rooms", element: <Rooms /> },
            {
                path: "/rooms/:id",
                element: (
                    <AgoraProvider>
                        <Room />
                    </AgoraProvider>
                ),
            },
        ],
    },

    ...authRouters,
    ...adminRouters,
]);

export default routers;
