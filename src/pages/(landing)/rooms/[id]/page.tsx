import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Button, Skeleton, Text } from "@mantine/core";
import {
    LocalUser,
    RemoteUser,
    useIsConnected,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./style.css";

const appId = import.meta.env.VITE_PUBLIC_AGORA_APP_ID;

const Room = () => {
    // const socket = useSocket();
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();

    const isConnected = useIsConnected();
    const [isCalled, setIsCalled] = useState(false);
    const [agoraToken, setAgoraToken] = useState("");
    const [userType, setUserType] = useState("");
    const [localUid, setLocalUid] = useState("");

    const { isLoading } = useJoin(
        {
            appid: appId,
            channel: id ?? "",
            token: agoraToken,
            uid: localUid,
        },
        isCalled
    );

    const [micOn, setMic] = useState(userType === "publisher" ? true : false);
    const [cameraOn, setCamera] = useState(
        userType === "publisher" ? true : false
    );
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);

    const remoteUsers = useRemoteUsers();

    useEffect(() => {
        const token = searchParams.get("token") ?? "";
        const uid = searchParams.get("userId") ?? "";
        const role = searchParams.get("role") ?? "";

        setAgoraToken(token);
        setLocalUid(uid);
        setUserType(role);
    }, [searchParams]);

    console.log({ isConnected });

    if (!id) {
        return <Text>Room channel not found...</Text>;
    }

    if (isLoading) {
        return (
            <div className="container py-10">
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="room">
                {isConnected ? (
                    <div className="user-list">
                        {userType === "publisher" && (
                            <div className="user">
                                <LocalUser
                                    audioTrack={localMicrophoneTrack}
                                    cameraOn={cameraOn}
                                    micOn={micOn}
                                    videoTrack={localCameraTrack}
                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                >
                                    <samp className="user-name">You</samp>
                                </LocalUser>
                            </div>
                        )}

                        {remoteUsers.map((user) => (
                            <div className="user" key={user.uid}>
                                <RemoteUser
                                    cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                                    user={user}
                                >
                                    <samp className="user-name">
                                        {user.uid}
                                    </samp>
                                </RemoteUser>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Button onClick={() => setIsCalled(true)}>Join Call</Button>
                )}
            </div>
            {isConnected && (
                <div className="control">
                    <div className="left-control">
                        <button
                            className="btn"
                            onClick={() => setMic((a) => !a)}
                        >
                            <i
                                className={`i-microphone ${
                                    !micOn ? "off" : ""
                                }`}
                            />
                        </button>
                        <button
                            className="btn"
                            onClick={() => setCamera((a) => !a)}
                        >
                            <i
                                className={`i-camera ${!cameraOn ? "off" : ""}`}
                            />
                        </button>
                    </div>
                    <button
                        className={`btn btn-phone ${
                            isCalled ? "btn-phone-active" : ""
                        }`}
                        onClick={() => setIsCalled((a) => !a)}
                    >
                        {isCalled ? (
                            <ActionIcon>
                                <Icon icon="fa:close" />
                            </ActionIcon>
                        ) : (
                            <ActionIcon>
                                <Icon icon="ion:call" />
                            </ActionIcon>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Room;
