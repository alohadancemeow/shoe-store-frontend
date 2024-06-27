"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { DAT } from "@/types";

type Props = {
  images: DAT[];
};

const ProductDetailsCarousel = ({ images }: Props) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <img key={img.id} src={`${img.attributes?.url}`} alt="image" />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
