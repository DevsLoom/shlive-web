import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Modal,
    TableTr,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ListingTable, { TableCell } from "../../../components/UI/ListingTable";
import {
    useDeleteDynamicPageMutation,
    useFetchDynamicPagesQuery,
} from "../../../stores/api/admin/dynamicPages";
import { DynamicPageType } from "../../../types/models/dynamicPages";
import type { TableHeaderType } from "../../../types/table";
import { alertMessage, message } from "../../../utils/helpers";
import DynamicPageForm from "../../../components/DynamicPages/Form/DynamicPageForm";

const DynamicPages = () => {
    const headers: TableHeaderType[] = [
        { label: "Page", align: "left" },
        { label: "Title", align: "left" },
        { label: "Status", align: "left" },
        { label: "Action", align: "center" },
    ];

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [params, setParams] = useState({
        offset: 1,
        limit: 10,
        search: "",
        fields: "",
    });

    const { data, isFetching, isSuccess, isError, error, refetch } =
        useFetchDynamicPagesQuery(
            `offset=${params.offset}&limit=${params.limit}${
                params.search ? `&search=${params.search}` : ""
            }${params.fields ? `&fields=${params.fields}` : ""}`
        );

    const paramsChangeHandler = (field: string, value: string | unknown) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    const closeHandler = () => {
        if (selectedId) {
            setSelectedId(null);
        }
        close();
    };
    const editHandler = (id: string) => {
        setSelectedId(id);
        open();
    };

    const [deleteItem] = useDeleteDynamicPageMutation();

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

    return (
        <>
            <Modal
                opened={opened}
                onClose={closeHandler}
                title={`${selectedId ? "Edit" : "Add"} Dynamic Page`}
                centered
                size="lg"
            >
                <DynamicPageForm close={closeHandler} selectedId={selectedId} />
            </Modal>

            <Flex align="center" justify="space-between" gap="xs">
                <Title size="sm">Dynamic Pages</Title>
                <Button size="sm" onClick={open}>
                    Add Dynamic Page
                </Button>
            </Flex>

            <ListingTable
                headers={headers}
                isLoading={isFetching}
                isError={isError}
                error={error}
                found={isSuccess && data?.data?.length > 0}
                body={data?.data?.map((item: DynamicPageType, i: number) => (
                    <TableTr className="bg-white" key={i}>
                        <TableCell>{item?.page ?? "N/A"}</TableCell>
                        <TableCell>{item?.title ?? "N/A"}</TableCell>
                        <TableCell className="uppercase">
                            {item?.status ?? "N/A"}
                        </TableCell>
                        <TableCell>
                            <Group gap="xs" justify="center">
                                <ActionIcon color="blue" variant="outline">
                                    <Icon icon="hugeicons:view" />
                                </ActionIcon>
                                <ActionIcon
                                    color="orange"
                                    variant="outline"
                                    onClick={() => editHandler(item?.id)}
                                >
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

export default DynamicPages;
