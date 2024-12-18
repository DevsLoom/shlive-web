import AgoraRTC from "agora-rtc-react";

export const agoraClient = AgoraRTC.createClient({
    mode: "live",
    codec: "vp8",
});
