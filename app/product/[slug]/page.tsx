import { fetchDataFromApi } from "@/utils/api";
import ProductDetails from "./ProductDetails";
import Wrapper from "@/components/Wrapper";
import RelatedProducts from "@/components/RelatedProducts";
import { ToastContainer } from "react-toastify";

type Props = {
  params: { slug: string };
};

const ProdcutPage = async ({ params }: Props) => {
  const product = await fetchDataFromApi(
    `/products?populate=*&filters[slug][$eq]=${params.slug}`
  );
  const relatedProducts = await fetchDataFromApi(
    `/products?populate=*&filters[slug][$ne]=${params.slug}`
  );

  return (
    <>
      <div className="w-full md:py-20">
        <ToastContainer />
        <Wrapper>
          <ProductDetails product={product} />
          <RelatedProducts relatedProducts={relatedProducts?.data} />
        </Wrapper>
      </div>
    </>
  );
};

export default ProdcutPage;
