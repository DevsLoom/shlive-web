import React from "react";
import { Outlet } from "react-router-dom";

const LandingLayout: React.FC = () => {
    return (
        <div className="w-full h-screen bg-[#c4d5eb] p-10">
            <Outlet />
        </div>
    );
};

export default LandingLayout;
