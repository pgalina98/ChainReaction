import Product from "./product.model";

export default interface ProductPage {
  totalElements: number;
  products: Product[];
}
