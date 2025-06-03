import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export const showSuccess = ({ title, text }: any) => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showError = ({ title, text }: any) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2500,
  });
};

export const showWarning = ({ title, text }: any) => {
  Swal.fire({
    position: "center",
    icon: "warning",
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const showConfirm = ({ title, text }: any) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};

export const showToast = ({ icon, title, text }: any) => {
  return Swal.fire({
    position: "top-end",
    icon: icon,
    title: title,
    text: text,
    toast: true,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const showCustom = ({ title, text }: any) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};
