"use client";

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
import moment from "moment";
import { useState } from "react";
import CoinSales from "../../../../components/Coins/Form/CoinSales";
import ListingTable, {
    TableCell,
} from "../../../../components/UI/ListingTable";
import { useFetchSaleCoinsQuery } from "../../../../stores/api/coins/coinSales";
import type { TableHeaderType } from "../../../../types/table";

const SalesCoin = () => {
    const headers: TableHeaderType[] = [
        { label: "Buyer", align: "left" },
        { label: "Package", align: "left" },
        { label: "Quantity", align: "left" },
        { label: "Price", align: "left" },
        { label: "Sale At", align: "left" },
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
        useFetchSaleCoinsQuery(
            `offset=${params.offset}&limit=${params.limit}${
                params.search ? `&search=${params.search}` : ""
            }${params.fields ? `&fields=${params.fields}` : ""}`
        );

    const paramsChangeHandler = (field: string, value: string | any) => {
        setParams((prevState) => ({ ...prevState, [field]: value }));
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Add Sale Coin"
                centered
            >
                <CoinSales close={close} refetch={refetch} />
            </Modal>

            <Flex align="center" justify="space-between" gap="xs">
                <Title size="sm">Sales Coin</Title>
                <Button size="sm" onClick={open}>
                    Add Sale
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
                        <TableCell>{item?.buyer?.name}</TableCell>
                        <TableCell>{item?.package?.name}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>{item?.price}</TableCell>
                        <TableCell>
                            {item.saleAt
                                ? moment(item.saleAt).format(
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

export default SalesCoin;
