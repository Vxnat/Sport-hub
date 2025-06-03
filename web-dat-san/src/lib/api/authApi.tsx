import axios from "axios";
const API_BASE_URL_USER = "http://localhost:3002/nguoi-dung";
export const useRegister = async (Email: string, MatKhau: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL_USER}/dang-ky`, {
      Email,
      MatKhau,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};
