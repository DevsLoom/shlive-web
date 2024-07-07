import React, { useState } from 'react';
import TextField from '../UI/TextField';
import { Button } from '@mantine/core';
import Validator from 'Validator';
import { resCallback, validateError } from '../../utils/helpers';
import { useCreateCoinPackageMutation } from '../../stores/api/coins/coinPackages';

type IProps = {
  payload?: object | null;
  close?: () => void;
  refetch?: () => void;
};

const CoinPackage: React.FC<IProps> = ({
  payload,
  close = () => {},
  refetch = () => {},
}) => {
  const [create, result] = useCreateCoinPackageMutation();
  const [form, setForm] = useState({
    name: '',
    quantity: 0,
    price: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState({
    name: { text: '', show: false },
    quantity: { text: '', show: false },
    price: { text: '', show: false },
    status: { text: '', show: false },
  });

  const fieldChangeHandler = (field: string, value: string | any) => {
    setErrors((prevState) => ({
      ...prevState,
      [field]: { text: '', show: false },
    }));
    setForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const validation = Validator.make(form, {
      name: 'required',
      quantity: 'required|numeric|min:1',
      price: 'required|numeric',
    });

    if (validation.fails()) {
      setErrors((prevState) => ({
        ...prevState,
        ...validateError(validation.getErrors()),
      }));
      return;
    }

    const { data, error } = await create(form);

    resCallback({
      data: data,
      error: error,
      cb: () => {
        if (data.status === 'success') {
          close();
          refetch();
        }
      },
      vErrCb: (vErrors) =>
        setErrors((prevState) => ({
          ...prevState,
          ...vErrors,
        })),
    });
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-3">
      <TextField
        label="Name"
        value={form.name}
        error={errors.name.text}
        onChange={(e) => fieldChangeHandler('name', e.target.value)}
      />
      <TextField
        label="Quantity"
        value={form.quantity}
        error={errors.quantity.text}
        onChange={(e) => fieldChangeHandler('quantity', Number(e.target.value))}
      />
      <TextField
        label="Price"
        value={form.price}
        error={errors.price.text}
        onChange={(e) => fieldChangeHandler('price', Number(e.target.value))}
      />
      <Button
        size="sm"
        fullWidth
        type="submit"
        classNames={{ root: 'shadow rounded-lg' }}
        loading={result?.isLoading}
      >
        Add Package
      </Button>
    </form>
  );
};

export default CoinPackage;
