export type RoomType = {
    type: string;
    status: string;
    startAt: string;
    endAt: string;
    user: {
        id: number;
        name: string;
        avatar: string;
    };
};
