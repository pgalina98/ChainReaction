import { OrderProduct } from "./order-product.model";
import DeliveryType from "./delivery-type.model";
import Address from "./address.model";

export interface Order {
  idOrder: number;
  products: OrderProduct[];
  deliveryType: DeliveryType;
  estimatedDelivery: string;
  address: Address;
  total: number;
}
