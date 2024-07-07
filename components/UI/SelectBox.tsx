import { Select, SelectProps } from '@mantine/core';
import React from 'react';

type IProps = SelectProps;

const SelectBox: React.FC<IProps> = ({ ...props }) => {
  return (
    <Select
      size="sm"
      classNames={{ label: 'font-semibold', input: 'rounded-lg' }}
      {...props}
    />
  );
};

export default SelectBox;
