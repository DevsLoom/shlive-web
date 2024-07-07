'use client';

import { Icon } from '@iconify/react';
import { ActionIcon, Flex, Group, TableTr, Title } from '@mantine/core';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import ListingTable, { TableCell } from '../../../components/UI/ListingTable';
import { useFetchRoomsQuery } from '../../../stores/api/rooms';
import type { TableHeaderType } from '../../../types/table';

const Rooms = () => {
  const headers: TableHeaderType[] = [
    { label: 'Host', align: 'left' },
    { label: 'Type', align: 'left' },
    { label: 'Status', align: 'left' },
    { label: 'Start At', align: 'left' },
    { label: 'End At', align: 'left' },
    { label: 'Action', align: 'center' },
  ];

  const [params, setParams] = useState({
    offset: 1,
    limit: 10,
    search: '',
    fields: '',
  });

  const { data, isFetching, isSuccess, isError, error } = useFetchRoomsQuery(
    `offset=${params.offset}&limit=${params.limit}${
      params.search ? `&search=${params.search}` : ''
    }${params.fields ? `&fields=${params.fields}` : ''}`
  );

  const paramsChangeHandler = (field: string, value: string | any) => {
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
                <Image
                  src={item?.user?.avatar}
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                {item?.user?.name}
              </Flex>
            </TableCell>
            <TableCell className="uppercase">{item?.type}</TableCell>
            <TableCell className="uppercase">{item.status}</TableCell>
            <TableCell>
              {item.startAt
                ? moment(item.startAt).format('Do MMM, YYYY hh:mm A')
                : ''}
            </TableCell>
            <TableCell>
              {item.endAt
                ? moment(item.endAt).format('Do MMM, YYYY hh:mm A')
                : ''}
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
        pageHandler={(value) => paramsChangeHandler('offset', value)}
      />
    </>
  );
};

export default Rooms;
