import { AgoraRTCProvider } from "agora-rtc-react";
import React from "react";
import { agoraClient } from "../constants/client";

const AgoraProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <AgoraRTCProvider client={agoraClient}>{children}</AgoraRTCProvider>;
};

export default AgoraProvider;
