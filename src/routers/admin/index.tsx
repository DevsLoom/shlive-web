import AdminLayout from "../../layouts/Admin";
import CoinGiftPackages from "../../pages/(admin)/coins/gifts/packages/page";
import CoinPackages from "../../pages/(admin)/coins/packages/page";
import SalesCoin from "../../pages/(admin)/coins/sales/page";
import Dashboard from "../../pages/(admin)/dashboard/page";
import Rooms from "../../pages/(admin)/rooms/page";
import Users from "../../pages/(admin)/users/page";

const adminRouters = [
    {
        path: "",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "rooms", element: <Rooms /> },
            {
                path: "coins",
                children: [
                    { path: "packages", element: <CoinPackages /> },
                    { path: "sales", element: <SalesCoin /> },
                    {
                        path: "gifts",
                        children: [
                            { path: "packages", element: <CoinGiftPackages /> },
                        ],
                    },
                ],
            },
        ],
    },
];

export default adminRouters;
