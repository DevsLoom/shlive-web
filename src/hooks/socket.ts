import { useEffect, useMemo } from "react";
import io from "socket.io-client";
import { BASE_URL } from "../constants/urls";

const useSocket = () => {
    const client = useMemo(() => io(BASE_URL), []);

    useEffect(() => {
        if (!client) return;
        client.on("connection", (socket) => {
            console.log(socket.connected);
        });
    }, [client]);

    return client;
};

export default useSocket;
