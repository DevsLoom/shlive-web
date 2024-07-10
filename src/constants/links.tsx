import { Icon } from "@iconify/react";

export const AdminSidebarLinks = [
    {
        label: "Dashboard",
        icon: (
            <Icon
                icon="material-symbols-light:dashboard-outline"
                fontSize={20}
            />
        ),
        href: "/dashboard",
    },
    {
        label: "Users",
        icon: <Icon icon="ph:users" fontSize={20} />,
        href: "/",
        children: [
            {
                label: "Resellers",
                icon: <Icon icon="fluent-mdl2:user-sync" fontSize={20} />,
                href: "/users?type=RESELLER",
            },
            {
                label: "Users",
                icon: <Icon icon="ph:users" fontSize={20} />,
                href: "/users?type=USER",
            },
        ],
    },
    {
        label: "Rooms",
        icon: <Icon icon="cil:room" fontSize={20} />,
        href: "/rooms",
    },
    {
        label: "Coin",
        icon: <Icon icon="bi:coin" />,
        href: "/",
        children: [
            {
                label: "Packages",
                icon: <Icon icon="mingcute:coin-2-line" fontSize={20} />,
                href: "/coins/packages",
            },
            {
                label: "Sales",
                icon: <Icon icon="pixelarticons:coin" fontSize={20} />,
                href: "/coins/sales",
            },
            {
                label: "Gifts",
                icon: <Icon icon="mdi:gift-outline" fontSize={20} />,
                href: "/coins/gifts/packages",
            },
        ],
    },
    // {
    //     label: "Settings",
    //     icon: <Icon icon="ant-design:setting-outlined" />,
    //     href: "/settings",
    // },
];
