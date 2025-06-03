import useSWR from "swr";
import axios from "axios";
import { buildQuery } from "@/utils/BuildQuery";
const API_BASE_URL_BOOKING = "http://localhost:3002/don-dat";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetUserBookings = async (filters: any) => {
  const queryString = buildQuery(filters);
  try {
    const response = await axios.get(
      `${API_BASE_URL_BOOKING}/chu-san?${queryString}`,
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

export const useGetUserBookingById = (id: string) => {
  try {
    const { data, error, isLoading } = useSWR(
      `${API_BASE_URL_BOOKING}/${id}`,
      fetcher
    );
    return { data, error, isLoading };
  } catch (error: any) {
    throw new Error(error?.response?.data?.message) || "Unknown error";
  }
};
