"use client";

import React, { useRef, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import { getDiscountedPricePercentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/store";
import { WelcomeDatum } from "@/types";

type Props = {
  product: WelcomeDatum;
};

const ProductDetails = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [showError, setShowError] = useState(false);
  const sizesGridRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const { name, images, price, original_price, size, subtitle, description } =
    (product && product.attributes) || {};

  const notify = () => {
    toast.success("Success. Check your cart!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleAddToCart = () => {
    if (typeof window === "undefined") return;

    if (!selectedSize) {
      setShowError(true);
      if (sizesGridRef.current) {
        sizesGridRef.current.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    } else {
      dispatch(
        addToCart({
          ...product,
          selectedSize,
          oneQuantityPrice: price,
        })
      );
      notify();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
      <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
        <ProductDetailsCarousel images={images?.data} />
      </div>

      <div className="flex-[1] py-3">
        <div className="text-[34px] font-semibold mb-2 leading-tight">
          {name}
        </div>

        <div className="text-lg font-semibold mb-5">{subtitle}</div>

        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold">MRP : {`฿ ${price}`}</p>
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

        <div className="text-md font-medium text-black/[0.5]">
          incl. of taxes
        </div>
        <div className="text-md font-medium text-black/[0.5] mb-20">
          {`(Also includes all applicable duties)`}
        </div>

        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <div className="text-md font-semibold">Select Size</div>
            <div className="text-md font-medium text-black/[0.5] cursor-pointer">
              Select Guide
            </div>
          </div>

          <div
            ref={sizesGridRef}
            id="sizesGrid"
            className="grid grid-cols-3 gap-2"
          >
            {size &&
              size.data.map((item, i) => (
                <div
                  key={i}
                  className={`border rounded-md text-center py-3 font-medium ${
                    item.enabled
                      ? "hover:border-black cursor-pointer"
                      : "cursor-not-allowed bg-black/[0.1] opacity-50"
                  } ${selectedSize === item.size ? "border-black" : ""}`}
                  onClick={() => {
                    setSelectedSize(item.size);
                    setShowError(false);
                  }}
                >
                  {item.size}
                </div>
              ))}
          </div>

          {showError && (
            <div className="text-red-600 mt-1">Size selection is required</div>
          )}
        </div>

        <button
          className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
          Whishlist
          <IoMdHeartEmpty size={20} />
        </button>

        <div>
          <div className="text-lg font-bold mb-5">Product Details</div>
          <div className="markdown text-md mb-5">
            <ReactMarkdown>{product.attributes?.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
