import { toast } from 'react-toastify';

export const toastError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

export const toastSuccess = (message: string) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
