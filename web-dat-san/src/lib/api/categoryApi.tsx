import useSWR from "swr";
const API_BASE_URL_CATEGORY = "http://localhost:3002/bo-mon";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetCategoryPerField = () => {
  try {
    const { data, error, isLoading } = useSWR(
      `${API_BASE_URL_CATEGORY}/san`,
      fetcher
    );
    return { data, error, isLoading };
  } catch (error) {
    throw error;
  }
};
