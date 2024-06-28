"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { CategoriesDatum, WelcomeDatum } from "@/types";
import { getHeaders, makeRequest } from "./helper";

// Function to fetch data from the API
export const fetchProducts = async () => {
  try {
    const url = makeRequest("/products?populate=*");
    const res = await axios.get(url, getHeaders());

    /**
     * Revalidating All Data.
     * This will purge the Client-side Router Cache,
     * and revalidate the Data Cache on the next page visit.
     */
    revalidatePath("/", "layout");

    return res.data.data as WelcomeDatum[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const url = makeRequest("/categories?populate=*");
    const res = await axios.get(url, getHeaders());

    // Revalidate the path after fetching categories
    revalidatePath("/category/[slug]", "page");

    return res.data.data as CategoriesDatum[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * It return data as array, if using 'filters'
 * @returns data[0]
 */
export const fetchCategoryBySlug = async (slug: string) => {
  try {
    const url = makeRequest(`/categories?filters[slug][$eq]=${slug}`);
    const res = await axios.get(url, getHeaders());

    return res.data.data[0] as CategoriesDatum;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const url = makeRequest(`/products?populate=*&filters[slug][$eq]=${slug}`);
    const res = await axios.get(url, getHeaders());

    return res.data.data[0] as WelcomeDatum;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchOtherProducts = async (slug: string) => {
  try {
    const url = makeRequest(`/products?populate=*&filters[slug][$ne]=${slug}`);
    const res = await axios.get(url, getHeaders());

    return res.data.data as WelcomeDatum[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchProductsInCategoryWithLimit = async (
  slug: string,
  limit: number
) => {
  try {
    const url = makeRequest(
      `/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${limit}`
    );
    const res = await axios.get(url, getHeaders());

    return res.data.data as WelcomeDatum[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const makePaymentRequest = async (endpoint: string, payload: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL!}${endpoint}`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_API_TOKEN!,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
