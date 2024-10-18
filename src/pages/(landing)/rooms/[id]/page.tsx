import { JitsiMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";
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
        <JitsiMeeting
            domain={"meet.devsloom.co"}
            roomName={roomName ?? ""}
            configOverwrite={{
                disableThirdPartyRequests: true,
                disableLocalVideoFlip: true,
                backgroundAlpha: 0.5,
                prejoinPageEnabled: false,
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                // filmStripOnly: false,
                filmStrip: false,
                disableModeratorIndicator: true,
                hideConferenceSubject: true,
                hideParticipantsStats: true,
                liveStreaming: {
                    enabled: true,
                },
                toolbarButtons: [
                    "hangup",
                    "microphone",
                    "camera",
                    "toggle-camera",
                ],
                participantsPane: {
                    enabled: false,
                },
                tileView: {
                    // disabled: true,
                    numberOfVisibleTiles: 5,
                },
            }}
            interfaceConfigOverwrite={{
                VIDEO_LAYOUT_FIT: "nocrop",
                MOBILE_APP_PROMO: false,
                TILE_VIEW_MAX_COLUMNS: 4,
                SHOW_JITSI_WATERMARK: false,
            }}
            userInfo={{
                displayName: "MyName" + Math.floor(Math.random() * 9999),
                email: `test${Math.random() * 9999}@gmail.com`,
            }}
            onApiReady={(externalApi) => {
                // here you can attach custom event listeners to the Jitsi Meet External API
                // you can also store it locally to execute commands
                // console.log({ externalApi });
                externalApi.addEventListener(
                    "participantJoined",
                    async (participant) => {
                        // console.log({
                        //     // current: participant,
                        //     room: await externalApi.getRoomsInfo(),
                        // });
                        console.log("myparticiant", participant);

                        externalApi.executeCommand(
                            "revokeModerator",
                            participant.id
                        );

                        externalApi.executeCommand("toggleFilmStrip");
                        externalApi.executeCommand("mute", true);
                        externalApi.executeCommand("displayName", "Visitor");
                    }
                );
                externalApi.addEventListener(
                    "videoConferenceJoined",
                    (e: any) => {
                        console.log({
                            videoJoined: e,
                        });
                    }
                );
            }}
            getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "100vh";
            }}
        />
    );
};

export default Room;
