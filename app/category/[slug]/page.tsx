import { Suspense } from "react";
import Category from "./Category";
import {
  fetchCategoryBySlug,
  fetchProductsInCategoryWithLimit,
} from "@/utils/api";

type Props = {
  params: { slug: string };
};

const maxResult = 3;

const CategoryPage = async ({ params }: Props) => {
  const getCategory = fetchCategoryBySlug(params.slug);
  const getProducts = fetchProductsInCategoryWithLimit(params.slug, maxResult);

  const [category, products] = await Promise.all([getCategory, getProducts]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Category category={category} products={products} slug={params.slug} />
    </Suspense>
  );
};

export default CategoryPage;
