import AuthLayout from "../layouts/Auth";
import Login from "../pages/(auth)/login/page";
import Register from "../pages/(auth)/register/page";

const authRouters = [
    {
        path: "",
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
        ],
    },
];

export default authRouters;
