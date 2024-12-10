import { Icon } from "@iconify/react";
import { ActionIcon, Avatar, Flex, Group, TableTr, Title } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import ListingTable, { TableCell } from "../../../components/UI/ListingTable";
import { Images } from "../../../constants/themeData";
import { useFetchRoomsQuery } from "../../../stores/api/admin/rooms";
import { TableHeaderType } from "../../../types/table";
import { imageUrlBuilder } from "../../../utils/helpers";

const Rooms = () => {
    const headers: TableHeaderType[] = [
        { label: "Host", align: "left" },
        { label: "Type", align: "left" },
        { label: "Status", align: "left" },
        { label: "Start At", align: "left" },
        { label: "End At", align: "left" },
        { label: "Action", align: "center" },
    ];

    const [params, setParams] = useState({
        offset: 1,
        limit: 10,
        search: "",
        fields: "",
    });

    const { data, isFetching, isSuccess, isError, error } = useFetchRoomsQuery(
        `offset=${params.offset}&limit=${params.limit}${
            params.search ? `&search=${params.search}` : ""
        }${params.fields ? `&fields=${params.fields}` : ""}`
    );

    const paramsChangeHandler = (field: string, value: string | unknown) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    return (
        <>
            <Title size="sm" mb="lg">
                Rooms
            </Title>

            <ListingTable
                headers={headers}
                isLoading={isFetching}
                isError={isError}
                error={error}
                found={isSuccess && data?.data?.length > 0}
                body={data?.data?.map((item, i) => (
                    <TableTr className="bg-white" key={i}>
                        <TableCell>
                            <Flex gap="xs" align="center">
                                <Avatar
                                    src={imageUrlBuilder(
                                        item?.user?.avatar,
                                        Images.DefaultImage
                                    )}
                                    alt="Avatar"
                                />
                                {item?.user?.name}
                            </Flex>
                        </TableCell>
                        <TableCell>{item?.type}</TableCell>
                        <TableCell className="capitalize">
                            {item.status}
                        </TableCell>
                        <TableCell>
                            {item.startAt
                                ? moment(item.startAt).format(
                                      "Do MMM, YYYY hh:mm A"
                                  )
                                : ""}
                        </TableCell>
                        <TableCell>
                            {item.endAt
                                ? moment(item.endAt).format(
                                      "Do MMM, YYYY hh:mm A"
                                  )
                                : ""}
                        </TableCell>
                        <TableCell>
                            <Group gap="xs" justify="center">
                                <ActionIcon color="blue" variant="outline">
                                    <Icon icon="hugeicons:view" />
                                </ActionIcon>
                                <ActionIcon color="orange" variant="outline">
                                    <Icon icon="ph:pencil-duotone" />
                                </ActionIcon>
                                <ActionIcon color="red" variant="outline">
                                    <Icon icon="ph:trash" />
                                </ActionIcon>
                            </Group>
                        </TableCell>
                    </TableTr>
                ))}
                paginate={true}
                total={data?.last_page}
                page={params.offset}
                pageHandler={(value) => paramsChangeHandler("offset", value)}
            />
        </>
    );
};

export default Rooms;
