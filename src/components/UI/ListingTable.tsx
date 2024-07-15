import {
    Pagination,
    ScrollArea,
    Table,
    TableTbody,
    TableTd,
    TableTdProps,
    TableTr,
} from "@mantine/core";
import React from "react";
import type { TableType } from "../../types/table";
import LoadingSkeleton from "./LoadingSkeleton";

export const TableCell: React.FC<TableTdProps> = ({ children, ...props }) => {
    return (
        <TableTd
            className="first:rounded-l-lg last:rounded-r-lg"
            p="md"
            {...props}
        >
            {children}
        </TableTd>
    );
};

const ListingTable: React.FC<TableType> = ({
    headers = [],
    body,
    total = 0,
    page = 0,
    found = false,
    paginate = false,
    pageHandler = () => {},
    isLoading = false,
    isError = false,
    error,
}) => {
    if (isLoading || isError) {
        return (
            <LoadingSkeleton
                isLoading={isLoading}
                isError={isError}
                error={error}
            />
        );
    }

    return (
        <ScrollArea offsetScrollbars>
            <Table
                classNames={{ table: "border-separate border-spacing-y-2" }}
                stickyHeader
                stickyHeaderOffset={60}
            >
                <TableTbody>
                    {headers.length > 0 && (
                        <TableTr className="bg-white">
                            {headers.map((item, i) => (
                                <TableCell
                                    key={i}
                                    align={item.align}
                                    fw={600}
                                    miw={item.w || 200}
                                >
                                    {item.label}
                                </TableCell>
                            ))}
                        </TableTr>
                    )}
                    {found ? (
                        body
                    ) : (
                        <TableTr className="bg-white">
                            <TableCell colSpan={headers.length || 1}>
                                No data available...
                            </TableCell>
                        </TableTr>
                    )}
                </TableTbody>
            </Table>

            {paginate && (
                <div className="bg-white px-2 py-3 rounded-lg flex justify-end">
                    <Pagination
                        total={total}
                        value={page}
                        onChange={(value) => pageHandler(value)}
                        size="sm"
                    />
                </div>
            )}
        </ScrollArea>
    );
};

export default ListingTable;
