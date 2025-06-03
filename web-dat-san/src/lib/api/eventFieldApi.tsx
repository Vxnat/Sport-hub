import useSWR from "swr";
import axios from "axios";
import { buildQuery } from "@/utils/BuildQuery";
const API_BASE_URL_EVENT_FIELD = "http://localhost:3002/lich-san";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCheckEventField = async ({
  SanID,
  Ngay,
  GioBatDau,
  GioKetThuc,
}: {
  SanID: string;
  Ngay: string;
  GioBatDau: string;
  GioKetThuc: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL_EVENT_FIELD}/kiem-tra`, {
      SanID,
      Ngay,
      GioBatDau,
      GioKetThuc,
    });

    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useGetEventFieldByFieldId = (id: string, date: string) => {
  try {
    const { data, error, isLoading } = useSWR(
      `${API_BASE_URL_EVENT_FIELD}/san/${id}?ngay=${date}`,
      fetcher
    );
    return { data, error, isLoading };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useBookingEventField = async ({
  SanID,
  Ngay,
  GioBatDau,
  GioKetThuc,
}: {
  SanID: string;
  Ngay: string;
  GioBatDau: string;
  GioKetThuc: string;
}) => {
  try {
    const token = localStorage.getItem("idToken");
    const response = await axios.post(
      `${API_BASE_URL_EVENT_FIELD}/dat-lich/${SanID}`,
      {
        Ngay,
        GioBatDau,
        GioKetThuc,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useGetUserEventFields = async (filters: any) => {
  const queryString = buildQuery(filters);
  try {
    const response = await axios.get(
      `${API_BASE_URL_EVENT_FIELD}/chu-san?${queryString}`,
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

export const useAddEventField = async ({
  SanID,
  Ngay,
  GioBatDau,
  GioKetThuc,
}: {
  SanID: string;
  Ngay: string;
  GioBatDau: string;
  GioKetThuc: string;
}) => {
  try {
    await axios.post(
      `${API_BASE_URL_EVENT_FIELD}/tao-lich-san`,
      {
        SanID,
        Ngay,
        GioBatDau,
        GioKetThuc,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useEditEventField = async (data: any) => {
  try {
    await axios.put(
      `${API_BASE_URL_EVENT_FIELD}/${data.LichID}`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};

export const useDeleteEventField = async ({ LichID }: { LichID: number }) => {
  try {
    await axios.delete(`${API_BASE_URL_EVENT_FIELD}/${LichID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("idToken")}`,
      },
    });
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};
