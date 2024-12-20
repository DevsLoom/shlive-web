import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../stores";

const AuthLayout: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticate, currentUser } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (isAuthenticate) {
            if (currentUser && currentUser?.type === "ADMIN") {
                navigate("/admin/dashboard", { replace: true });
            } else if (currentUser && currentUser?.type !== "ADMIN") {
                navigate("/rooms", { replace: true });
            }
        }
    }, [currentUser, isAuthenticate, navigate]);

    return (
        <div className="p-4 bg-blue-100 h-screen flex flex-col  md:justify-center items-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg min-w-[350px] max-w-[500px]">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
