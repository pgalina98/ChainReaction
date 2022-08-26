import Product from "@models/product/product.model";

export interface OrderProduct {
  product: Product;
  quantity: number;
}
