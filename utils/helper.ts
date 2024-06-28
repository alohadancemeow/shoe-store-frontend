export const getDiscountedPricePercentage = (
  originalPrice: any,
  discountedPrice: any
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = (discount / originalPrice) * 100;

  return discountPercentage.toFixed(2);
};

// Function to create the full request URL
export const makeRequest = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL!}${endpoint}`;
};

export const getHeaders = () => ({
  headers: {
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_API_TOKEN!,
  },
});
