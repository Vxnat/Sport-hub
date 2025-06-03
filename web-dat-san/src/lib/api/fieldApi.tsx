import useSWR from "swr";
import axios from "axios";
import { buildQuery } from "@/utils/BuildQuery";
const API_BASE_URL_FIELD = "http://localhost:3002/san";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetAllFields = ({
  id,
  limit,
  page,
  query,
}: {
  id: string;
  limit: number;
  page: number;
  query: string;
}) => {
  try {
    const queryString = buildQuery({ limit, page, query });
    const { data, error, isLoading } = useSWR(
      `${API_BASE_URL_FIELD}/danh-sach/${id}?${queryString}`,
      fetcher
    );
    return { data, error, isLoading };
  } catch (error) {
    throw error;
  }
};

export const useGetFieldById = (id: string) => {
  try {
    const { data, error, isLoading } = useSWR(
      `${API_BASE_URL_FIELD}/${id}`,
      fetcher
    );
    return { data, error, isLoading };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useGetUserFields = async (filters: any) => {
  const queryString = buildQuery(filters);
  try {
    const response = await axios.get(
      `${API_BASE_URL_FIELD}/chu-san?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useAddField = async ({
  TenSan,
  ViTri,
  MoTa,
  Gia,
  BoMonID,
}: {
  TenSan: string;
  ViTri: string;
  MoTa: string;
  Gia: number;
  BoMonID: number;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL_FIELD}/tao-san`,
      {
        TenSan,
        ViTri,
        MoTa,
        Gia,
        BoMonID,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useEditField = async ({
  SanID,
  TenSan,
  ViTri,
  MoTa,
  Gia,
  BoMonID,
  TrangThai,
}: {
  SanID: number;
  TenSan: string;
  ViTri: string;
  MoTa: string;
  Gia: number;
  BoMonID: number;
  TrangThai: number;
}) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL_FIELD}/${SanID}`,
      {
        TenSan,
        ViTri,
        MoTa,
        Gia,
        BoMonID,
        TrangThai,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useDeleteField = async ({ SanID }: { SanID: number }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL_FIELD}/${SanID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};
