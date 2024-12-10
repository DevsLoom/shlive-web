import { Avatar, Button, Flex, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSocket from "../../../hooks/socket";
import { RootState } from "../../../stores";
import { useCreateAgoraLoginMutation } from "../../../stores/api/auth";
import { message } from "../../../utils/helpers";

const Rooms = () => {
    const { isAuthenticate, currentUser } = useSelector(
        (state: RootState) => state.auth
    );
    const client = useSocket();
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const [create, result] = useCreateAgoraLoginMutation();

    const roomHandler = (id: string) => {
        if (!isAuthenticate) {
            message({
                title: "Sorry, You are not authenticated",
                icon: "error",
            });
            navigate("/login");
            return;
        }

        const form = { role: "subscriber", channel: id, uid: currentUser?.id };

        create(form)
            .unwrap()
            .then((res) => {
                navigate(
                    `/rooms/${id}?token=${res.data}&userId=${form.uid}&role=${form.role}`
                );
            })
            .catch((err) => {
                message({ title: err.message, icon: "error", timer: 3000 });
            });
    };

    const addRoom = () => {
        if (!isAuthenticate) {
            message({
                title: "Sorry, You are not authenticated",
                icon: "error",
            });
            navigate("/login");
            return;
        }

        const form = {
            userId: currentUser?.id,
            type: "meeting",
            video: true,
            audio: false,
            facing: "front",
        };

        client.emit("IO_ADD_ROOM", form, (res: any) => {
            if (res.status) {
                message({ title: res.message, icon: "success" });
                navigate(
                    `/rooms/${res.data?.room?.id}?token=${res.data.token}&userId=${form.userId}&role=publisher`
                );
            } else {
                message({ title: res.message, icon: "error" });
            }
        });
    };

    useEffect(() => {
        if (!isAuthenticate) return;
        if (!client) return;

        if (currentUser) {
            client.emit("IO_CONNECT", { userId: currentUser?.id });
        }

        client.emit(
            "IO_LIST_ROOM",
            { get_all: 1 },
            (res: { status: boolean; data: any }) => {
                console.log(res);
                if (res.status) {
                    setRooms(res.data);
                }
            }
        );

        return () => {
            client.emit("IO_DISCONNECT");
        };
    }, [client, currentUser, isAuthenticate]);

    return (
        <div className="container py-4">
            <Flex justify="space-between" align="center" gap="sm" mb="lg">
                <Title>Rooms</Title>
                <Button size="sm" variant="outlined" onClick={addRoom}>
                    Add Room
                </Button>
            </Flex>

            {!rooms?.length ? (
                <Text>No rooms available</Text>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {rooms.map(
                        (
                            item: {
                                id: string;
                                user: { name: string; avatar: string };
                            },
                            i
                        ) => (
                            <Button
                                key={i}
                                loading={result.isLoading}
                                size="xl"
                                variant="outline"
                                fullWidth
                                color="dark"
                                leftSection={
                                    <Avatar
                                        src={
                                            item?.user?.avatar ??
                                            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                        }
                                        alt={item?.user?.name}
                                    />
                                }
                                onClick={() => roomHandler(item.id)}
                            >
                                {item?.user?.name}
                            </Button>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Rooms;
