import axios from "@utils/api";

import Product from "@models/product/product.model";
import ProductFilter from "@models/product/product-filter.model";
import ProductPage from "@models/product/product-page.model";
import Pagination from "@models/pagination/pagination.model";

export const fetchProductsByProductType = (productType: string) => {
  return async () =>
    await axios.get<Product[]>(`/products?productType=${productType}`);
};

export const fetchProductById = (idProduct: string) => {
  return async () => await axios.get<Product>(`/products/${idProduct}`);
};

export const fetchProductsByFilter = (
  pagination: Pagination,
  productTypes: number[],
  filter: ProductFilter
) => {
  return async () =>
    await axios.post<ProductPage>(
      `/products/filter?page=${pagination.page}&size=${pagination.size}&productTypes=${productTypes}`,
      filter
    );
};
