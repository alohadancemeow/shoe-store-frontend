import ProductDetails from "./ProductDetails";
import Wrapper from "@/components/Wrapper";
import RelatedProducts from "@/components/RelatedProducts";
import { ToastContainer } from "react-toastify";

import { fetchProductBySlug, fetchOtherProducts } from "@/utils/api";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

const ProdcutPage = async ({ params }: Props) => {
  const fetchProduct = fetchProductBySlug(params.slug);
  const fetchProducts = fetchOtherProducts(params.slug);

  const [product, products] = await Promise.all([fetchProduct, fetchProducts]);

  return (
    <>
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetails product={product} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <RelatedProducts products={products} />
          </Suspense>
        </Wrapper>
      </div>
    </>
  );
};

export default ProdcutPage;
