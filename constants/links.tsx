import { Icon } from '@iconify/react';

export const AdminSidebarLinks = [
  {
    label: 'Dashboard',
    icon: <Icon icon="material-symbols-light:dashboard-outline" />,
    href: '/dashboard',
  },
  {
    label: 'Users',
    icon: <Icon icon="ph:users" />,
    href: '/users',
  },
  {
    label: 'Rooms',
    icon: <Icon icon="cil:room" />,
    href: '/rooms',
  },
  {
    label: 'Coin',
    icon: <Icon icon="bi:coin" />,
    href: '/',
    children: [
      {
        label: 'Packages',
        icon: <Icon icon="mingcute:coin-2-line" />,
        href: '/coins/packages',
      },
      {
        label: 'Sales',
        icon: <Icon icon="pixelarticons:coin" />,
        href: '/coins/sales',
      },
    ],
  },
  {
    label: 'Settings',
    icon: <Icon icon="ant-design:setting-outlined" />,
    href: '/settings',
  },
];
