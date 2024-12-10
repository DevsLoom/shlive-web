import AgoraRTC from "agora-rtc-react";

export const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
