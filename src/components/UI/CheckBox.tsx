import { Checkbox, CheckboxProps } from '@mantine/core';
import React from 'react';

type IProps = CheckboxProps;

const CheckBox: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="py-1">
      <Checkbox {...props} />
    </div>
  );
};

export default CheckBox;
