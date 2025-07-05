import { toast } from "react-toastify";

export const SuccessFully = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 900,
  });
};

export const ShowError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 900,
  });
};
