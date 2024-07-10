import { Icon } from "@iconify/react";
import {
    AppShell,
    Avatar,
    Button,
    Center,
    Flex,
    Image,
    NavLink,
    Popover,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AdminSidebarLinks } from "../constants/links";
import { Images } from "../constants/themeData";
import { RootState } from "../stores";
import { logout } from "../stores/reducers/auth";

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticate, currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    const logoutHandler = () => {
        dispatch(
            logout({
                cb: () => navigate("/login", { replace: true }),
            })
        );
    };

    useEffect(() => {
        if (!isAuthenticate) {
            navigate("/login", { replace: true });
        }
    }, [isAuthenticate, navigate]);

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
                    <Center>
                        <Image
                            src={Images.Logo}
                            alt="Logo"
                            className="w-[220px] h-full"
                        />
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
                                            <Avatar
                                                src={currentUser?.avatar}
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
                        >
                            {item.children.map((cItem, cI) => (
                                <NavLink
                                    key={cI}
                                    to={cItem.href}
                                    label={cItem.label}
                                    component={Link}
                                    leftSection={cItem.icon}
                                />
                            ))}
                        </NavLink>
                    ) : (
                        <NavLink
                            key={i}
                            to={item.href}
                            label={item.label}
                            component={Link}
                            leftSection={item.icon}
                        />
                    )
                )}
            </AppShell.Navbar>

            <AppShell.Main className="bg-[#f4f5f9]">
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default AdminLayout;
