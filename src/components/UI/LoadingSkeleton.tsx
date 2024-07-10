import { Flex, Skeleton, Text, Title } from '@mantine/core';
import React from 'react';

type IProps = {
  count?: number;
  isLoading?: boolean;
  isError?: boolean;
  error?: {
    status?: string;
    data?: {
      statusCode?: string;
      message?: string;
    };
    error?: string;
  };
};

const LoadingSkeleton: React.FC<IProps> = ({
  count = 8,
  isLoading = false,
  isError = false,
  error = null,
}) => {
  if (isLoading) {
    return (
      <>
        {Array(count)
          .fill(1)
          .map((_, i) => (
            <Skeleton key={i} height={30} radius="sm" mt="sm" />
          ))}
      </>
    );
  }

  if (isError) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        h="100%"
        mih="100px"
      >
        <Title size="h2" className="text-7xl" c="red">
          {error?.status !== 'PARSING_ERROR' ? error?.data?.statusCode : 500}
        </Title>
        <Text size="lg" c="red">
          {error?.status !== 'PARSING_ERROR'
            ? error?.data?.message
            : error?.error}
        </Text>
      </Flex>
    );
  }
};

export default LoadingSkeleton;
