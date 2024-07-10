import React from "react";

const LandingLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <div className="w-full h-screen bg-[#c4d5eb] p-10">{children}</div>;
};

export default LandingLayout;
