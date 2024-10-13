import React, { useEffect, useState } from "react";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useParams } from "react-router-dom";

const Room = () => {
    const { id } = useParams<{ id: string }>();
    const [roomName, setRoomName] = useState(id);

    useEffect(() => {
        if (!id) {
            const name = "HeyMYRoom_" + Math.floor(Math.random() * 999999);
            setRoomName(name);
        }
    }, [id]);

    return (
        <JaaSMeeting
            appId="vpaas-magic-cookie-575e9fc1eef04b14ba46e5e6b931c62d"
            roomName={roomName ?? ""}
            jwt="eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNTc1ZTlmYzFlZWYwNGIxNGJhNDZlNWU2YjkzMWM2MmQvZmEyYTEyLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3Mjc5NzY4MDIsImV4cCI6MTcyNzk4NDAwMiwibmJmIjoxNzI3OTc2Nzk3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNTc1ZTlmYzFlZWYwNGIxNGJhNDZlNWU2YjkzMWM2MmQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImFzaHJhZi5lbW9uMTQzIiwiaWQiOiJnb29nbGUtb2F1dGgyfDExNTc3MzQxNzI4Njc4NzM0NzQ3OSIsImF2YXRhciI6IiIsImVtYWlsIjoiYXNocmFmLmVtb24xNDNAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.l5a8-hPvkPaH1QqPoyMgXUtrYi-kZZ882ugn1YOTKjNTVkjiO7JSrJbnZVsCx_klM0319xFS-2N0B-xWjjV4LPdPaQKfqLn6FlLWyZeuBV_0-tlFHfpRRLI--bBJFCdHbMn9yulO7-F9dqtGb3elXBn9X4siI4WH0j9HbfB7LnydNWLZrPJqNhnWEL8F37Mc73oP3lI5gQTr2fyvEhMvUOiJ6LbMYeebG_nG_xLI9qRH-E2rdDpU-SSaJ54HIJkii57VgJQJM2f9z5IXrs9MMDC6u3oMrivzs_bbEBsLdcYckbg2Os7nkJzZp2XUKe-mXWd1wMJCpLpGNIcaVkORyA"
            configOverwrite={{
                disableThirdPartyRequests: true,
                disableLocalVideoFlip: true,
                backgroundAlpha: 0.5,
                prejoinPageEnabled: false,
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                filmStripOnly: true,
                disableModeratorIndicator: true,
                toolbarButtons: ["hangup", "microphone", "camera"],
                participantsPane: {
                    enabled: false,
                },
            }}
            interfaceConfigOverwrite={{
                VIDEO_LAYOUT_FIT: "nocrop",
                MOBILE_APP_PROMO: false,
                TILE_VIEW_MAX_COLUMNS: 4,
                SHOW_JITSI_WATERMARK: false,
            }}
            // spinner={<h2>Loading</h2>}
            onApiReady={(externalApi) => {
                // console.log("e", { externalApi });
                console.log(externalApi.getParticipantsInfo());
                externalApi.addEventListener("participantJoined", () => {
                    console.log("test");
                });
            }}
            userInfo={{
                displayName: "Viewer",
                email: "viewer",
            }}
            getIFrameRef={(node) => (node.style.height = "800px")}
        />
    );
};

export default Room;
