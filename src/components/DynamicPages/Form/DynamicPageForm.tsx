import { Button, Stack } from "@mantine/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { DynamicPageTypes, RegularStatuses } from "../../../constants/selects";
import {
    useCreateDynamicPageMutation,
    useFetchDynamicPageQuery,
    useUpdateDynamicPageMutation,
} from "../../../stores/api/admin/dynamicPages";
import { IProps } from "../../../types/global";
import { DynamicPageFormType } from "../../../types/models/dynamicPages";
import { message, validateError } from "../../../utils/helpers";
import LoadingSkeleton from "../../UI/LoadingSkeleton";
import SelectBox from "../../UI/SelectBox";
import TextEditor from "../../UI/TextEditor";
import TextField from "../../UI/TextField";

const DynamicPageForm: React.FC<IProps & { selectedId?: string | null }> = ({
    selectedId,
    close = () => {},
}) => {
    const [createPage, resultCreatePage] = useCreateDynamicPageMutation();
    const [updatePage, resultUpdatePage] = useUpdateDynamicPageMutation();

    const {
        data,
        isFetching,
        isError: dIsError,
        error,
    } = useFetchDynamicPageQuery(selectedId, {
        skip: !selectedId,
        refetchOnMountOrArgChange: true,
    });

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            page: "",
            content: "",
            status: "active",
        },
    });

    const successCallbackHandler = (res: any) => {
        if (res.status === "success") {
            message({
                title: res?.message,
                icon: "success",
                timer: 3000,
            });
            close();
        }
    };

    const errorCallbackHandler = (err: any) => {
        if (err.status === "validateError") {
            const errors = validateError(err.data);
            Object.keys(errors).forEach((fieldName) =>
                setError(fieldName as keyof DynamicPageFormType, {
                    type: "manual",
                    message: errors[fieldName],
                })
            );
        } else {
            message({
                title: err?.message,
                icon: "error",
                timer: 3000,
            });
        }
    };

    const onSubmit = async (data: DynamicPageFormType) => {
        if (selectedId) {
            await updatePage({ ...data, id: selectedId })
                .unwrap()
                .then((res) => successCallbackHandler(res))
                .catch((err) => errorCallbackHandler(err));
        } else {
            await createPage(data)
                .unwrap()
                .then((res) => successCallbackHandler(res))
                .catch((err) => errorCallbackHandler(err));
        }
    };

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            Object.keys(data).forEach((key) => {
                if (data[key] !== null) {
                    setValue(key as keyof DynamicPageFormType, data[key]);
                }
            });
        }
    }, [data]);

    if (isFetching || dIsError) {
        return (
            <LoadingSkeleton
                isLoading={isFetching}
                isError={dIsError}
                error={error}
            />
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="sm">
                <Controller
                    control={control}
                    name="page"
                    rules={{ required: "Page field is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectBox
                            label="Page"
                            data={DynamicPageTypes}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors.page?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: "Title field is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            label="Title"
                            value={value}
                            error={errors.title?.message}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="content"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextEditor
                            label="Content"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectBox
                            label="Status"
                            data={RegularStatuses}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={errors.status?.message}
                        />
                    )}
                />

                <Button
                    size="sm"
                    fullWidth
                    type="submit"
                    classNames={{ root: "shadow rounded-lg" }}
                    loading={
                        resultCreatePage.isLoading || resultUpdatePage.isLoading
                    }
                >
                    {selectedId ? "Update" : "Add"} Page
                </Button>
            </Stack>
        </form>
    );
};

export default DynamicPageForm;
