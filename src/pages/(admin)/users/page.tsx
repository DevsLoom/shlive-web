import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Avatar,
    Button,
    Flex,
    Group,
    Modal,
    TableTr,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ListingTable, { TableCell } from "../../../components/UI/ListingTable";
import UserForm from "../../../components/Users/Form/UserForm";
import {
    useDeleteUserMutation,
    useFetchUsersQuery,
} from "../../../stores/api/users";
import type { TableHeaderType } from "../../../types/table";
import { alertMessage, imageUrlBuilder, message } from "../../../utils/helpers";

const Users = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    const headers: TableHeaderType[] = [
        { label: "Name", align: "left" },
        { label: "Email", align: "left" },
        { label: "Phone", align: "left" },
        { label: "Gender", align: "left" },
        { label: "Action", align: "center" },
    ];

    const [opened, { open, close }] = useDisclosure(false);

    const [params, setParams] = useState({
        offset: 1,
        limit: 10,
        search: "",
        fields: "",
    });

    const { data, isFetching, isSuccess, isError, error, refetch } =
        useFetchUsersQuery(
            `offset=${params.offset}&limit=${params.limit}${
                params.search ? `&search=${params.search}` : ""
            }${params.fields ? `&fields=${params.fields}` : ""}&type=${type}`
        );

    const paramsChangeHandler = (field: string, value: string | unknown) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    const [deleteItem] = useDeleteUserMutation();

    const deleteHandler = (id: string) => {
        alertMessage({
            cb: async () => {
                const { data, error } = await deleteItem(id);
                message({
                    title: error ? error?.message : data?.message,
                    icon: error ? "error" : "success",
                    timer: 3000,
                });

                if (data) {
                    refetch();
                }
            },
        });
    };

    if (type !== "RESELLER" && type !== "USER") {
        return (
            <div className="text-center">
                <Title mb="lg">Please visit a right path</Title>
                <Link to="/users?type=USER">Back to Users</Link>
            </div>
        );
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={`Add ${type === "RESELLER" ? "Reseller" : "User"}`}
                centered
            >
                <UserForm close={close} refetch={refetch} type={type} />
            </Modal>

            <Flex align="center" justify="space-between" gap="xs">
                <Title size="sm">
                    {type === "RESELLER" ? "Resellers" : "Users"}
                </Title>
                <Button size="sm" onClick={open}>
                    Add {type === "RESELLER" ? "Reseller" : "User"}
                </Button>
            </Flex>

            <ListingTable
                headers={headers}
                isLoading={isFetching}
                isError={isError}
                error={error}
                found={isSuccess && data?.data?.length > 0}
                body={data?.data?.map((item: object, i: number) => (
                    <TableTr className="bg-white" key={i}>
                        <TableCell>
                            <Flex gap="xs" align="center">
                                <Avatar
                                    src={imageUrlBuilder(item?.avatar)}
                                    alt="Avatar"
                                />
                                {item?.name}
                            </Flex>
                        </TableCell>
                        <TableCell>{item?.email}</TableCell>
                        <TableCell>{item?.phone}</TableCell>
                        <TableCell className="uppercase">
                            {item?.gender}
                        </TableCell>
                        <TableCell>
                            <Group gap="xs" justify="center">
                                <ActionIcon color="blue" variant="outline">
                                    <Icon icon="hugeicons:view" />
                                </ActionIcon>
                                <ActionIcon color="orange" variant="outline">
                                    <Icon icon="ph:pencil-duotone" />
                                </ActionIcon>
                                <ActionIcon
                                    color="red"
                                    variant="outline"
                                    onClick={() => deleteHandler(item?.id)}
                                >
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

export default Users;
