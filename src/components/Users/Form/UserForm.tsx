import { Button } from "@mantine/core";
import React, { useState } from "react";
import Validator from "Validator";
import { useCreateUserMutation } from "../../../stores/api/users";
import { IProps } from "../../../types/global";
import { resCallback, validateError } from "../../../utils/helpers";
import SecretTextField from "../../UI/SecretTextField";
import TextField from "../../UI/TextField";

const UserForm: React.FC<IProps & { type?: string | null }> = ({
    payload,
    close = () => {},
    refetch = () => {},
    type = "USER",
}) => {
    const [create, result] = useCreateUserMutation();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        type: type,
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        email: { text: "", show: false },
        phone: { text: "", show: false },
        password: { text: "", show: false },
        password_confirmation: { text: "", show: false },
        type: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string | any) => {
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
            email: "required|email",
            phone: "required",
            password: "required|min:6",
            password_confirmation: "required|same:password",
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
            <TextField
                label="Name"
                value={form.name}
                error={errors.name.text}
                onChange={(e) => fieldChangeHandler("name", e.target.value)}
            />
            <TextField
                label="Email"
                value={form.email}
                error={errors.email.text}
                onChange={(e) => fieldChangeHandler("email", e.target.value)}
            />
            <TextField
                label="Phone"
                value={form.phone}
                error={errors.phone.text}
                onChange={(e) => fieldChangeHandler("phone", e.target.value)}
            />
            <SecretTextField
                label="Password"
                value={form.password}
                error={errors.password.text}
                onChange={(e) => fieldChangeHandler("password", e.target.value)}
            />
            <SecretTextField
                label="Confirm Password"
                value={form.password_confirmation}
                error={errors.password_confirmation.text}
                onChange={(e) =>
                    fieldChangeHandler("password_confirmation", e.target.value)
                }
            />
            <Button
                size="sm"
                fullWidth
                type="submit"
                classNames={{ root: "shadow rounded-lg" }}
                loading={result?.isLoading}
            >
                Add User
            </Button>
        </form>
    );
};

export default UserForm;
