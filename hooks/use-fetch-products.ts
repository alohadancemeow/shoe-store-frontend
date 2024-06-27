import useSWR from "swr";
import { Welcome } from "@/types";
import { headers, makeRequest } from "@/utils/api";

const maxResult = 3;

const fetcher = (url: string) => fetch(url, headers).then((r) => r.json());

const useFetchProducts = (slug: string, pageIndex: number = 1) => {
  const url = makeRequest(
    `/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`
  );

  const { data, error, isLoading } = useSWR(
    url,
    fetcher
    // {
    //   fallbackData: products,
    // }
  );

  return { data: data as Welcome, error, isLoading };
};

export default useFetchProducts;
