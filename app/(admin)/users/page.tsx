'use client';

import { Icon } from '@iconify/react';
import { ActionIcon, Group, TableTr, Title } from '@mantine/core';
import { useState } from 'react';
import ListingTable, { TableCell } from '../../../components/UI/ListingTable';
import { useFetchUsersQuery } from '../../../stores/api/users';
import type { TableHeaderType } from '../../../types/table';

const Users = () => {
  const headers: TableHeaderType[] = [
    { label: 'Name', align: 'left' },
    { label: 'Email', align: 'left' },
    { label: 'Phone', align: 'left' },
    { label: 'Gender', align: 'left' },
    { label: 'Action', align: 'center' },
  ];

  const [params, setParams] = useState({
    offset: 1,
    limit: 10,
    search: '',
    fields: 'name,email,phone,gender',
  });

  const { data, isFetching, isSuccess, isError, error } = useFetchUsersQuery(
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
        Users
      </Title>

      <ListingTable
        headers={headers}
        isLoading={isFetching}
        isError={isError}
        error={error}
        found={isSuccess && data?.data?.length > 0}
        body={data?.data?.map((item: object, i: number) => (
          <TableTr className="bg-white" key={i}>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.phone}</TableCell>
            <TableCell className="uppercase">{item?.gender}</TableCell>
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

export default Users;
