import { Button } from "@mantine/core";
import React, { useState } from "react";
import Validator from "Validator";
import { useCreateCoinGiftPackageMutation } from "../../../stores/api/coins/giftPackages";
import { IProps } from "../../../types/global";
import { resCallback, validateError } from "../../../utils/helpers";
import FileUploader from "../../UI/FileUploader";
import TextField from "../../UI/TextField";

const CoinGiftPackageForm: React.FC<IProps> = ({
    close = () => {},
    refetch = () => {},
}) => {
    const [create, result] = useCreateCoinGiftPackageMutation();
    const [form, setForm] = useState({
        name: "",
        quantity: 0,
        attachment: "",
        status: "active",
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        quantity: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string | unknown) => {
        setErrors((prevState) => ({
            ...prevState,
            [field]: { text: "", show: false },
        }));
        setForm((prevState) => ({ ...prevState, [field]: value }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const validation = Validator.make(form, {
            name: "required",
            quantity: "required|numeric|min:1",
            attachment: "sometimes",
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
            <FileUploader
                file={form.attachment}
                uploadHandler={(value) =>
                    fieldChangeHandler("attachment", value)
                }
            />
            <TextField
                label="Name"
                value={form.name}
                error={errors.name.text}
                onChange={(e) => fieldChangeHandler("name", e.target.value)}
            />
            <TextField
                label="Quantity"
                value={form.quantity}
                error={errors.quantity.text}
                onChange={(e) =>
                    fieldChangeHandler("quantity", Number(e.target.value))
                }
            />
            <Button
                size="sm"
                fullWidth
                type="submit"
                classNames={{ root: "shadow rounded-lg" }}
                loading={result?.isLoading}
            >
                Add Gift Item
            </Button>
        </form>
    );
};

export default CoinGiftPackageForm;
