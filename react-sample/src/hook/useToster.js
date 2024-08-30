import { toast } from "react-toastify";

export const useToast = () => {
  const autoHide = 3000;
  const notifySuccess = (message) =>
    toast.success(message, { className: "toast-success", autoClose: autoHide });
  const notifyError = (message) =>
    toast.error(message, { className: "toast-error", autoClose: autoHide });
  const notifyWarning = (message) =>
    toast.warning(message, { className: "toast-warning", autoClose: autoHide });

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
  };
};
