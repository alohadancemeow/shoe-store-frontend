"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/ProductCard";

import { useSearchParams } from "next/navigation";
import { CategoriesDatum, WelcomeDatum } from "@/types";
import useFetchProducts from "@/hooks/use-fetch-products";

type Props = {
  products: WelcomeDatum[];
  category: CategoriesDatum;
  slug: string;
};

const Category = ({ category, products, slug }: Props) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { size } = useSearchParams();

  const { data, error, isLoading } = useFetchProducts(slug, pageIndex);

  // console.log(data, "data");

  useEffect(() => {
    setPageIndex(1);
  }, [size]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category?.attributes?.name}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.data?.map((product: any) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>

        {data?.meta?.pagination?.total > 3 && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;
