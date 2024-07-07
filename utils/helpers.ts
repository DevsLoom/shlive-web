import Swal, { SweetAlertIcon } from 'sweetalert2';

export const validateError = (data: any) => {
  const validate: any = {};
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      validate[key] = { text: data[key][0], show: true };
    } else {
      validate[key] = { text: data[key], show: true };
    }
  });
  return validate;
};

export const message = (props: object) => Swal.fire(props);

export const alertMessage = ({
  cb = () => {},
  alert = true,
  title = 'Are you sure?',
  text = 'Do you want to continue?',
  icon = 'question',
  btnText = 'Yes, Delete it',
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
  data: { message: string } | any;
  error: { status: string; data: any; message: string } | any;
  cb?: () => void;
  vErrCb?: (value: any) => void;
  errCb?: () => void;
}) => {
  if (data) {
    message({ title: data.message, icon: 'success', timer: 1500 });
    cb();
  } else if (error) {
    if (
      Object.prototype.hasOwnProperty.call(error, 'status') &&
      error.status === 'validate_error'
    ) {
      vErrCb(validateError(error.data));
    } else {
      message({ title: error.message, icon: 'error', timer: 2500 });
      errCb();
    }
  }
};

export const selectGenerator = (
  options: { [key: string]: string }[] = [],
  labelKey = 'title',
  valueKey = 'value'
) => {
  if (!options.length) {
    return [];
  }
  return options.map((item) => ({
    label: item[labelKey],
    value: item[valueKey].toString(),
  }));
};
