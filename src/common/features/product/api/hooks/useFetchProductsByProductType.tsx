import { useQuery } from "react-query";

import { getProductTypeValue } from "@enums/product-type";

import { fetchProductsByProductType } from "../queries";

import { FETCH_PRODUCTS_BY_PRODUCT_TYPE } from "../queries/constants";

const useFetchProductsByProductType = (productType: number): any => {
  return useQuery(
    FETCH_PRODUCTS_BY_PRODUCT_TYPE,
    fetchProductsByProductType(getProductTypeValue(productType)!),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useFetchProductsByProductType;
