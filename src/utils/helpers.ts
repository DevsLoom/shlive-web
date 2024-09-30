import Swal, { SweetAlertIcon, SweetAlertOptions } from "sweetalert2";

export const validateError = (data: { [key: string]: string[] | string }) => {
    const validate: { [key: string]: { text: string; show: boolean } } = {};
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            validate[key] = { text: data[key][0], show: true };
        } else {
            validate[key] = { text: data[key], show: true };
        }
    });
    return validate;
};

export const message = (props: SweetAlertOptions) => Swal.fire(props);

export const alertMessage = ({
    cb = () => {},
    alert = true,
    title = "Are you sure?",
    text = "Do you want to continue?",
    icon = "question",
    btnText = "Yes, Delete it",
}: {
    cb?: () => void;
    alert?: boolean;
    title?: string;
    text?: string;
    icon?: SweetAlertIcon;
    btnText?: string;
}) => {
    if (alert) {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: btnText,
            showCancelButton: true,
            focusCancel: true,
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                cb();
            }
            return false;
        });
    } else {
        cb();
    }
};

export const resCallback = ({
    data,
    error,
    cb = () => {},
    vErrCb = () => {},
    errCb = () => {},
}: {
    data: {
        message?: string;
        data?: unknown;
        status?: string;
    } | null;
    error: {
        status?: string;
        data: { [key: string]: string[] | string } | never;
        message?: string;
    } | null;
    cb?: () => void;
    vErrCb?: (value: {
        [key: string]: { text: string; show: boolean };
    }) => void;
    errCb?: () => void;
}) => {
    if (data) {
        message({ title: data.message, icon: "success", timer: 1500 });
        cb();
    } else if (error) {
        if (
            Object.prototype.hasOwnProperty.call(error, "status") &&
            error.status === "validateError"
        ) {
            vErrCb(validateError(error.data));
        } else {
            message({ title: error.message, icon: "error", timer: 2500 });
            errCb();
        }
    }
};

export const selectGenerator = (
    options: { [key: string]: string }[] = [],
    labelKey = "title",
    valueKey = "value"
) => {
    if (!options.length) {
        return [];
    }
    return options.map((item) => ({
        label: item[labelKey],
        value: item[valueKey].toString(),
    }));
};

// export const imageUrlBuilder = (value?: { host: string; path: string }) => {
//     if (value?.host && value?.path) {
//         return value?.host + value?.path;
//     }
//     return null;
// };

export const imageUrlBuilder = (
    value?: string | string[],
    defaultImage?: string
) => {
    if (value && Array.isArray(value)) {
        return value[0];
    } else if (value) {
        return value;
    }
    return defaultImage;
};
