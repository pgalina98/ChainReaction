import { useQuery } from "react-query";

import { getProductTypeValue } from "@enums/product-type";

import { fetchProductsByProductTypeAndProductName } from "../queries";

import { FETCH_PRODUCTS_BY_PRODUCT_TYPE_AND_PRODUCT_NAME } from "../queries/constants";

const useFetchProductsByProductTypeAndProductName = (
  productType: number,
  productName?: string
): any => {
  return useQuery(
    FETCH_PRODUCTS_BY_PRODUCT_TYPE_AND_PRODUCT_NAME,
    fetchProductsByProductTypeAndProductName(
      getProductTypeValue(productType)!,
      productName!
    ),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useFetchProductsByProductTypeAndProductName;
