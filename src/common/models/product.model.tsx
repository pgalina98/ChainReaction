import ProductColor from "@models/product-color.model";
import ProductType from "@models/product-type.model";

export default interface Product {
  idProduct: number;
  name: string;
  description?: string;
  model?: string;
  assistSpeed?: number;
  batteryRange?: number;
  chargingTime?: number;
  weight?: number;
  price: number;
  color?: ProductColor;
  availableQuantity: number;
  imagePath: string;
  type?: ProductType;
}
