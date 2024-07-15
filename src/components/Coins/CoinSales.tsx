import { Button } from "@mantine/core";
import Validator from "Validator";
import React, { useState } from "react";
import { useFetchCoinPackagesQuery } from "../../stores/api/coins/coinPackages";
import { useCreateSaleCoinMutation } from "../../stores/api/coins/coinSales";
import { useFetchUsersQuery } from "../../stores/api/users";
import { IProps } from "../../types/global";
import {
    resCallback,
    selectGenerator,
    validateError,
} from "../../utils/helpers";
import SelectBox from "../UI/SelectBox";
import TextField from "../UI/TextField";

const CoinSales: React.FC<IProps> = ({
    close = () => {},
    refetch = () => {},
}) => {
    const { data: users } = useFetchUsersQuery("get_all=1&status=active");
    const { data: packages } = useFetchCoinPackagesQuery(
        "get_all=1&status=active"
    );

    const [create, result] = useCreateSaleCoinMutation();
    const [form, setForm] = useState({
        type: "package",
        buyerId: null,
        packageId: null,
        quantity: 0,
        price: 0,
    });

    const [errors, setErrors] = useState({
        type: { text: "", show: false },
        buyerId: { text: "", show: false },
        packageId: { text: "", show: false },
        quantity: { text: "", show: false },
        price: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string | unknown) => {
        setErrors((prevState) => ({
            ...prevState,
            [field]: { text: "", show: false },
        }));
        setForm((prevState) => ({ ...prevState, [field]: value }));

        if (field === "packageId" && value) {
            const payload = packages?.find(
                (item: { id: string }) => item.id === value
            );
            setForm((prevState) => ({
                ...prevState,
                quantity: payload?.quantity,
                price: payload?.price,
            }));
        }

        if (field === "type" && value === "non_package") {
            setForm((prevState) => ({
                ...prevState,
                packageId: null,
                quantity: 0,
                price: 0,
            }));
        }
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const validation = Validator.make(form, {
            type: "required|in:package,non_package",
            buyerId: "required",
            packageId: "required_if:type,=,package",
            quantity: "required_if:type,=,non_package",
            price: "required|numeric",
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
                if (data.status === "success") {
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
            <SelectBox
                label="Type"
                data={[
                    { label: "Package", value: "package" },
                    { label: "Non Package", value: "non_package" },
                ]}
                value={form.type}
                onChange={(value) => fieldChangeHandler("type", value)}
            />
            <SelectBox
                label="Buyer"
                data={selectGenerator(users, "name", "id")}
                value={form.buyerId}
                onChange={(value) => fieldChangeHandler("buyerId", value)}
            />
            {form.type === "package" && (
                <SelectBox
                    label="Package"
                    data={selectGenerator(packages, "name", "id")}
                    value={form.packageId}
                    onChange={(value) => fieldChangeHandler("packageId", value)}
                />
            )}
            <TextField
                label="Quantity"
                value={form.quantity}
                error={errors.quantity.text}
                readOnly={form.type === "package"}
                onChange={(e) =>
                    fieldChangeHandler("quantity", Number(e.target.value))
                }
            />
            <TextField
                label="Price"
                value={form.price}
                error={errors.price.text}
                onChange={(e) =>
                    fieldChangeHandler("price", Number(e.target.value))
                }
            />
            <Button
                size="sm"
                fullWidth
                type="submit"
                classNames={{ root: "shadow rounded-lg" }}
                loading={result?.isLoading}
            >
                Add Sale Coin
            </Button>
        </form>
    );
};

export default CoinSales;
