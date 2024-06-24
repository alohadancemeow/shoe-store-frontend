"use client";

import { getDiscountedPricePercentage } from "@/utils/helper";
import Link from "next/link";

type Props = {
  prodcut?: any;
};

const ProductCard = ({ prodcut }: Props) => {
  return (
    <Link
      href={`/product/${prodcut?.attributes?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img
        width={500}
        height={500}
        src={`${process.env.NEXT_PUBLIC_UPLOAD_URL}${prodcut.attributes?.thumbnail.data.attributes.url}`}
        alt={prodcut.attributes?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{prodcut?.attributes?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            &#8377;{prodcut?.attributes?.price}
          </p>

          {prodcut?.attributes?.original_price && (
            <>
              <p className="text-base  font-medium line-through">
                &#8377;{prodcut?.attributes?.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  prodcut?.attributes?.original_price,
                  prodcut?.attributes?.price
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
