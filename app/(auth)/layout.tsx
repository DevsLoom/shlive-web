"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticate } = useSelector((state: RootState) => state.auth);

    return (
        <div className="p-4 bg-blue-100 h-screen flex flex-col  md:justify-center items-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg min-w-[350px] max-w-[500px]">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
