"use client";

import { Icon } from "@iconify/react";
import {
    AppShell,
    Button,
    Center,
    Flex,
    NavLink,
    Popover,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminSidebarLinks } from "../../constants/links";
import { Images } from "../../constants/themeData";
import { RootState } from "../../stores";
import { logout } from "../../stores/reducers/auth";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticate, currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    const logoutHandler = () => {
        dispatch(
            logout({
                cb: () => router.replace("/login"),
            })
        );
    };

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 230,
                breakpoint: "sm",
                // collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header p="xs">
                <Flex h="100%" justify="space-between" gap="xs">
                    <Center className="w-[220px]">
                        <Link href="/dashboard" className="w-full h-full">
                            <Image
                                src={Images.Logo}
                                alt="Logo"
                                className="w-full h-full"
                            />
                        </Link>
                    </Center>

                    <Center>
                        <Flex gap="xs">
                            <Popover
                                width={140}
                                position="bottom"
                                withArrow
                                shadow="md"
                                classNames={{ dropdown: "p-1" }}
                            >
                                <Popover.Target>
                                    <Button
                                        variant="light"
                                        leftSection={
                                            <Image
                                                src={currentUser?.avatar}
                                                width={20}
                                                height={20}
                                                alt="Avatar"
                                            />
                                        }
                                    >
                                        {currentUser?.name}
                                    </Button>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {/* <Button
                                        variant="subtle"
                                        size="sm"
                                        fullWidth
                                        leftSection={
                                            <Icon
                                                icon="healthicons:ui-user-profile"
                                                fontSize={20}
                                            />
                                        }
                                    >
                                        Profile
                                    </Button> */}
                                    <Button
                                        variant="subtle"
                                        size="sm"
                                        fullWidth
                                        color="red"
                                        leftSection={
                                            <Icon
                                                icon="material-symbols:logout-sharp"
                                                fontSize={20}
                                            />
                                        }
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Button>
                                </Popover.Dropdown>
                            </Popover>
                        </Flex>
                    </Center>
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar p="md" className="shadow-lg border-0">
                {AdminSidebarLinks.map((item, i) =>
                    item.children ? (
                        <NavLink
                            key={i}
                            label={item.label}
                            leftSection={item.icon}
                            classNames={{ label: "text-base" }}
                        >
                            {item.children.map((cItem, cI) => (
                                <NavLink
                                    key={cI}
                                    href={cItem.href}
                                    label={cItem.label}
                                    component={Link}
                                    leftSection={cItem.icon}
                                    classNames={{ label: "text-base" }}
                                />
                            ))}
                        </NavLink>
                    ) : (
                        <NavLink
                            key={i}
                            href={item.href}
                            label={item.label}
                            component={Link}
                            leftSection={item.icon}
                            classNames={{ label: "text-base" }}
                        />
                    )
                )}
            </AppShell.Navbar>

            <AppShell.Main className="bg-[#f4f5f9]">{children}</AppShell.Main>
        </AppShell>
    );
};

export default AdminLayout;
