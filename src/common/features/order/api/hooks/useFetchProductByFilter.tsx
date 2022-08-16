import { useMutation } from "react-query";

import { fetchProductsByFilter } from "../queries";

import { FETCH_PRODUCTS_BY_FILTER } from "../queries/constants";

const useFetchProductsByFilter = (productTypes: number[]): any => {
  return useMutation(FETCH_PRODUCTS_BY_FILTER, (data: any): any => {
    return fetchProductsByFilter(
      data?.pagination,
      productTypes,
      data?.productFilter
    )();
  });
};

export default useFetchProductsByFilter;
