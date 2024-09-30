import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { message } from "../../../../utils/helpers";
import ReactPlayer from "react-player";

const IO_URL = import.meta.env.VITE_PUBLIC_API_URL;

const Room = () => {
    const [params] = useSearchParams();
    const socket = useMemo(() => io(IO_URL), []);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    const connection = useCallback(() => {
        const userId = params.get("userId");
        socket.emit(
            "IO_CONNECT",
            { userId: userId },
            (res: { status: boolean; message: string }) => {
                message({
                    title: res.message,
                    icon: res.status ? "success" : "error",
                });
            }
        );
    }, [params, socket]);

    const init = useCallback(() => {
        socket.on("connect", () => {
            console.log(
                `Socket connected: ${socket.connected}, SocketID: ${socket.id}, `
            );

            connection();
        });
    }, [connection, socket]);

    const getUserMedia = useCallback(async () => {
        const media = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });
        setLocalStream(media);
    }, []);

    useEffect(() => {
        init();
    }, [init]);

    useEffect(() => {
        getUserMedia();
    }, [getUserMedia]);

    return (
        <div>
            {localStream && (
                <ReactPlayer
                    url={localStream}
                    width={200}
                    height={200}
                    playing
                />
            )}
        </div>
    );
};

export default Room;
