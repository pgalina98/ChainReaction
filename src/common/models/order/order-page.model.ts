import { Order } from "./order.model";

export interface OrderPage {
  totalElements: number;
  orders: Order[];
}
