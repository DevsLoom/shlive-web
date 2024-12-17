import { Icon } from "@iconify/react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useFetchDynamicPagesQuery } from "../stores/api/publics";

const LandingLayout: React.FC = () => {
    const { data: pages } = useFetchDynamicPagesQuery("get_all=1");

    return (
        <div className="w-full min-h-screen">
            {/* Header */}
            <div className="bg-[#F8F9FA]">
                <div className="container py-4">
                    <Link to="/">
                        <div className="flex items-center gap-2">
                            <img
                                src="https://bongoitalia.com/static/assets/images/logo.jpg"
                                alt="Logo"
                                className="w-[30px]"
                            />
                            <h4 className="text-lg font-semibold">SH Live</h4>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Children */}

            <div className="min-h-[672px]">
                <Outlet />
            </div>

            {/* Footer */}
            <div className="bg-[#F8F9FA]">
                <div className="container py-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2">
                        <div className="flex flex-col gap-2">
                            <Link to="/">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="https://bongoitalia.com/static/assets/images/logo.jpg"
                                        alt="Logo"
                                        className="w-[30px]"
                                    />
                                    <h4 className="text-lg font-semibold">
                                        SH Live
                                    </h4>
                                </div>
                            </Link>
                            <p className="text-base">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:support@shlive.com"
                                    className="underline text-blue-400"
                                >
                                    support@shlive.com
                                </a>
                            </p>
                            <p className="text-base">
                                <strong>Phone:</strong>{" "}
                                <a
                                    href="tel:+88019855500052"
                                    className="underline text-blue-400"
                                >
                                    +39 366 371 1050
                                </a>
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 lg:text-right">
                            <h6 className="text-base font-semibold">
                                Address:
                            </h6>
                            <p className="text-base">
                                Piazzetta Caldomai, 90134, Palermo, Italy
                            </p>
                            <h6 className="text-base font-semibold">
                                Follow Us:
                            </h6>
                            <nav className="flex gap-2 lg:justify-end">
                                <a href="" className="text-[#4267B2]">
                                    <Icon
                                        icon="fe:facebook"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                                <a href="" className="text-[#FF0000]">
                                    <Icon
                                        icon="bi:youtube"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                                <a href="" className="text-[#E3508C]">
                                    <Icon
                                        icon="mdi:instagram"
                                        width="24"
                                        height="24"
                                    />
                                </a>
                            </nav>

                            {pages?.length > 0 && (
                                <nav className="flex gap-2 lg:justify-end">
                                    {pages?.map(
                                        (
                                            item: {
                                                title: string;
                                                slug: string;
                                            },
                                            i: number
                                        ) => (
                                            <Link
                                                key={i}
                                                to={`/pages/${item.slug}`}
                                                className="text-blue-400"
                                            >
                                                {item.title}
                                            </Link>
                                        )
                                    )}
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingLayout;
