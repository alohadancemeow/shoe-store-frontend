"use client";

import { WelcomeDatum } from "@/types";
import { getDiscountedPricePercentage } from "@/utils/helper";
import Link from "next/link";

type Props = {
  product: WelcomeDatum;
};

const ProductCard = ({ product }: Props) => {
  const { name, price, slug, thumbnail, original_price } = product?.attributes;

  return (
    <Link
      href={`/product/${slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        className="w-[500px] h-[500px] object-cover"
        src={`${thumbnail?.data?.attributes?.url}`}
        alt={name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">{`฿ ${price}`}</p>

          {original_price && (
            <>
              <p className="text-base  font-medium line-through">
                {`฿ ${original_price}`}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(original_price, price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
