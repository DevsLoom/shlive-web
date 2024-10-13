import React from "react";
import { Outlet } from "react-router-dom";

const LandingLayout: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-[#c4d5eb]">
            <Outlet />
        </div>
    );
};

export default LandingLayout;
