import { fetchDataFromApi } from "@/utils/api";
import Category from "./Category";

type Props = {
  params: { slug: string };
};

const maxResult = 3;

const CategoryPage = async ({ params }: Props) => {
  const category = await fetchDataFromApi(
    `/categories?filters[slug][$eq]=${params.slug}`
  );
  const products = await fetchDataFromApi(
    `/products?populate=*&[filters][categories][slug][$eq]=${params.slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return (
    <>
      <Category category={category} products={products} slug={params.slug} />
    </>
  );
};

export default CategoryPage;
