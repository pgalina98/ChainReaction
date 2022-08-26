import ProductType from "@models/product/product-type.model";

export default interface ProductFilter {
  keyword?: string;
  brands?: string[];
  types?: number[];
  colors?: number[];
  maxPrice?: number;
}

export const createInitProductFilter = (): ProductFilter => {
  return {
    keyword: "",
    brands: [],
    types: [],
    colors: [],
    maxPrice: null!,
  };
};
