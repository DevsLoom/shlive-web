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
import CoinPackage from "../../../../components/Coins/Form/CoinPackage";
import ListingTable, {
    TableCell,
} from "../../../../components/UI/ListingTable";
import {
    useDeleteCoinPackageMutation,
    useFetchCoinPackagesQuery,
} from "../../../../stores/api/coins/coinPackages";
import { TableHeaderType } from "../../../../types/table";
import { alertMessage, message } from "../../../../utils/helpers";

const CoinPackages = () => {
    const headers: TableHeaderType[] = [
        { label: "Name", align: "left" },
        { label: "Quantity", align: "left" },
        { label: "Price", align: "left" },
        { label: "Status", align: "left" },
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
        useFetchCoinPackagesQuery(
            `offset=${params.offset}&limit=${params.limit}${
                params.search ? `&search=${params.search}` : ""
            }${params.fields ? `&fields=${params.fields}` : ""}`
        );

    const paramsChangeHandler = (field: string, value: string | unknown) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    const [deleteItem] = useDeleteCoinPackageMutation();

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
                onClose={close}
                title="Add Coin Package"
                centered
            >
                <CoinPackage close={close} refetch={refetch} />
            </Modal>

            <Flex align="center" justify="space-between" gap="xs">
                <Title size="sm">Coin Packages</Title>
                <Button size="sm" onClick={open}>
                    Add Package
                </Button>
            </Flex>

            <ListingTable
                headers={headers}
                isLoading={isFetching}
                isError={isError}
                error={error}
                found={isSuccess && data?.data?.length > 0}
                body={data?.data?.map((item, i) => (
                    <TableTr className="bg-white" key={i}>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>{item?.price}</TableCell>
                        <TableCell className="uppercase">
                            {item?.status}
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
                                    onClick={() => deleteHandler(item.id)}
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

export default CoinPackages;
