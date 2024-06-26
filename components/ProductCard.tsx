"use client";

import { getDiscountedPricePercentage } from "@/utils/helper";
import Link from "next/link";

type Props = {
  product?: any;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product?.attributes?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        className="w-[500px] h-[500px] object-cover"
        src={`${product.attributes?.thumbnail.url}`}
        alt={product.attributes?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{product?.attributes?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            {`฿ ${product?.attributes?.price}`}
          </p>

          {product?.attributes?.original_price && (
            <>
              <p className="text-base  font-medium line-through">
                {`฿ ${product?.attributes?.original_price}`}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  product?.attributes?.original_price,
                  product?.attributes?.price
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
