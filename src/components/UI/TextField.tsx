import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';

type IProps = TextInputProps;

const TextField: React.FC<IProps> = ({ ...props }) => {
  return (
    <TextInput
      size="sm"
      classNames={{ label: 'font-semibold', input: 'rounded-lg' }}
      {...props}
    />
  );
};

export default TextField;
