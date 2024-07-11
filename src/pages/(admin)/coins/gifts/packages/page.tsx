import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Image,
    Modal,
    TableTr,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CoinGiftPackageForm from "../../../../../components/Coins/Form/CoinGiftPackage";
import ListingTable, {
    TableCell,
} from "../../../../../components/UI/ListingTable";
import {
    useDeleteCoinGiftPackageMutation,
    useFetchCoinGiftPackagesQuery,
} from "../../../../../stores/api/coins/giftPackages";
import { TableHeaderType } from "../../../../../types/table";
import { alertMessage, message } from "../../../../../utils/helpers";

const CoinGiftPackages = () => {
    const headers: TableHeaderType[] = [
        { label: "Attachment", align: "left" },
        { label: "Name", align: "left" },
        { label: "Quantity", align: "left" },
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
        useFetchCoinGiftPackagesQuery(
            `offset=${params.offset}&limit=${params.limit}${
                params.search ? `&search=${params.search}` : ""
            }${params.fields ? `&fields=${params.fields}` : ""}`
        );

    const paramsChangeHandler = (field: string, value: string | unknown) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    const [deleteItem] = useDeleteCoinGiftPackageMutation();

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
                title="Add Coin Gift Item"
                centered
            >
                <CoinGiftPackageForm close={close} refetch={refetch} />
            </Modal>

            <Flex align="center" justify="space-between" gap="xs">
                <Title size="sm">Coin Gifts</Title>
                <Button size="sm" onClick={open}>
                    Add Gift
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
                        <TableCell>
                            <Image
                                src={item?.attachment}
                                alt={item?.name}
                                classNames={{ root: "w-12 h-12" }}
                            />
                        </TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
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

export default CoinGiftPackages;
