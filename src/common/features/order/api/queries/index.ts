import axios from "@utils/api";

import Product from "@models/product.model";

export const fetchProductsByProductType = (productType: string) => {
  return async () =>
    await axios.get<Product[]>(`/products?productType=${productType}`);
};

export const fetchProductById = (idProduct: string) => {
  return async () => await axios.get<Product>(`/products/${idProduct}`);
};
