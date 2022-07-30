import { useQuery } from "react-query";

import { fetchProductById } from "../queries";

import { FETCH_PRODUCT_BY_ID } from "../queries/constants";

const useFetchProductById = (idProduct: string): any => {
  return useQuery(FETCH_PRODUCT_BY_ID, fetchProductById(idProduct), { enabled: false });
};

export default useFetchProductById;
