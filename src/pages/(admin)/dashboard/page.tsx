import { Icon } from "@iconify/react";
import { Avatar, Card, Flex, TableTr, Text, Title } from "@mantine/core";
import moment from "moment";
import { useSelector } from "react-redux";
import ListingTable, { TableCell } from "../../../components/UI/ListingTable";
import LoadingSkeleton from "../../../components/UI/LoadingSkeleton";
import { RootState } from "../../../stores";
import {
    useFetchLatestCoinSalesReportsQuery,
    useFetchLatestRoomsReportsQuery,
    useFetchLatestUsersReportsQuery,
    useFetchSummaryReportsQuery,
} from "../../../stores/api/reports";
import { TableHeaderType } from "../../../types/table";
import { imageUrlBuilder } from "../../../utils/helpers";

const Dashboard = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);

    const { data, isFetching, isError, error } =
        useFetchSummaryReportsQuery(``);

    const roomHeaders: TableHeaderType[] = [
        { label: "Host", align: "left" },
        { label: "Type", align: "left" },
        { label: "Status", align: "left" },
        { label: "Start At", align: "left" },
    ];

    const {
        data: rooms,
        isFetching: roomIsFetching,
        isError: roomIsError,
        error: roomError,
        isSuccess: roomIsSuccess,
    } = useFetchLatestRoomsReportsQuery(``);

    const userHeaders: TableHeaderType[] = [
        { label: "Name", align: "left" },
        { label: "Phone", align: "left" },
        { label: "Email", align: "left" },
    ];

    const {
        data: users,
        isFetching: userIsFetching,
        isError: userIsError,
        error: userError,
        isSuccess: userIsSuccess,
    } = useFetchLatestUsersReportsQuery(``);

    const salesHeaders: TableHeaderType[] = [
        { label: "Buyer", align: "left" },
        { label: "Quantity", align: "left" },
        { label: "Price", align: "left" },
        { label: "Sale At", align: "left" },
        { label: "Status", align: "left" },
    ];

    const {
        data: sales,
        isFetching: saleIsFetching,
        isError: saleIsError,
        error: saleError,
        isSuccess: saleIsSuccess,
    } = useFetchLatestCoinSalesReportsQuery(``);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Summary */}
            <div className="col-span-full">
                <Title size="sm" mb="lg">
                    Welcome, {currentUser?.name || "Buddy"}
                </Title>

                {isFetching || isError ? (
                    <LoadingSkeleton
                        isError={isError}
                        isLoading={isFetching}
                        error={error}
                    />
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                        <Card className="bg-red-200">
                            <div className="flex flex-col gap-1">
                                <Icon icon="clarity:users-line" fontSize={25} />

                                <Title className="text-2xl">
                                    {data?.users?.resellers || 0}
                                </Title>
                                <Text className="text-sm">Total Resellers</Text>
                            </div>
                        </Card>

                        <Card className="bg-red-200">
                            <div className="flex flex-col gap-1">
                                <Icon icon="clarity:users-line" fontSize={25} />

                                <Title className="text-2xl">
                                    {data?.users?.users || 0}
                                </Title>
                                <Text className="text-sm">Total Users</Text>
                            </div>
                        </Card>

                        <Card className="bg-orange-200">
                            <div className="flex flex-col gap-1">
                                <Icon icon="cil:room" fontSize={25} />

                                <Title className="text-2xl">
                                    {data?.rooms || 0}
                                </Title>
                                <Text className="text-sm">Rooms</Text>
                            </div>
                        </Card>

                        <Card className="bg-green-200">
                            <div className="flex flex-col gap-1">
                                <Icon
                                    icon="mingcute:coin-2-line"
                                    fontSize={25}
                                />

                                <Title className="text-2xl">
                                    {data?.coinPackages || 0}
                                </Title>
                                <Text className="text-sm">Coin Packages</Text>
                            </div>
                        </Card>

                        <Card className="bg-blue-200">
                            <div className="flex flex-col gap-1">
                                <Icon icon="pixelarticons:coin" fontSize={25} />

                                <Title className="text-2xl">
                                    {data?.coinSales || 0}
                                </Title>
                                <Text className="text-sm">Sells Coin</Text>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            {/* Latest Rooms */}
            <div>
                <Title size="sm" mb="lg">
                    Rooms
                </Title>

                <ListingTable
                    headers={roomHeaders}
                    isLoading={roomIsFetching}
                    isError={roomIsError}
                    error={roomError}
                    found={roomIsSuccess && rooms?.length > 0}
                    body={rooms?.map((item, i) => (
                        <TableTr className="bg-white" key={i}>
                            <TableCell>
                                <Flex gap="xs" align="center">
                                    <Avatar
                                        src={imageUrlBuilder(
                                            item?.user?.avatar
                                        )}
                                        alt="Avatar"
                                    />
                                    {item?.user?.name}
                                </Flex>
                            </TableCell>
                            <TableCell className="uppercase">
                                {item?.type}
                            </TableCell>
                            <TableCell className="uppercase">
                                {item?.status}
                            </TableCell>
                            <TableCell>
                                {item.startAt
                                    ? moment(item.startAt).format(
                                          "Do MMM, YYYY hh:mm A"
                                      )
                                    : ""}
                            </TableCell>
                        </TableTr>
                    ))}
                />
            </div>

            {/* Latest Users */}
            <div>
                <Title size="sm" mb="lg">
                    Users
                </Title>

                <ListingTable
                    headers={userHeaders}
                    isLoading={userIsFetching}
                    isError={userIsError}
                    error={userError}
                    found={userIsSuccess && users?.length > 0}
                    body={users?.map((item, i) => (
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
                            <TableCell>{item?.phone}</TableCell>
                            <TableCell>{item?.email}</TableCell>
                        </TableTr>
                    ))}
                />
            </div>

            {/* Coin Sales */}
            <div className="col-span-full">
                <Title size="sm" mb="lg">
                    Coin Sales
                </Title>

                <ListingTable
                    headers={salesHeaders}
                    isLoading={saleIsFetching}
                    isError={saleIsError}
                    error={saleError}
                    found={saleIsSuccess && sales?.length > 0}
                    body={sales?.map((item, i) => (
                        <TableTr className="bg-white" key={i}>
                            <TableCell>
                                <Flex gap="xs" align="center">
                                    <Avatar
                                        src={imageUrlBuilder(
                                            item?.buyer?.avatar
                                        )}
                                        alt="Avatar"
                                    />
                                    {item?.buyer?.name}
                                </Flex>
                            </TableCell>
                            <TableCell>{item?.quantity}</TableCell>
                            <TableCell>{item?.price}</TableCell>
                            <TableCell>
                                {item.saleAt
                                    ? moment(item.saleAt).format(
                                          "Do MMM, YYYY hh:mm A"
                                      )
                                    : ""}
                            </TableCell>
                            <TableCell className="uppercase">
                                {item?.status}
                            </TableCell>
                        </TableTr>
                    ))}
                />
            </div>
        </div>
    );
};

export default Dashboard;
