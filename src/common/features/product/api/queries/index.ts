import axios from "@utils/api";

import Product from "@models/product/product.model";
import ProductFilter from "@models/product/product-filter.model";
import ProductPage from "@models/product/product-page.model";
import Pagination from "@models/pagination/pagination.model";

export const fetchProductsByProductTypeAndProductName = (
  productType: string,
  productName?: string | null
) => {
  return async () =>
    await axios.get<Product[]>(
      `/products?productType=${productType}&productName=${productName}`
    );
};

export const fetchProductById = (idProduct: string) => {
  return async () => await axios.get<Product>(`/products/${idProduct}`);
};

export const fetchProductsByFilter = (
  productTypes: number[],
  pagination: Pagination,
  filter: ProductFilter
) => {
  return async () =>
    await axios.post<ProductPage>(
      `/products/filter?page=${pagination.page}&size=${pagination.size}&productTypes=${productTypes}`,
      filter
    );
};
