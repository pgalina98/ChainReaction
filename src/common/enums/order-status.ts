import { default as OrderStatusModel } from "@models/order/order-status.model";

export enum OrderStatus {
  CREATED = 1,
  IN_TRANSIT = 2,
  DELIVERED = 3,
}

export const getOrderStatus = (
  orderStatus: OrderStatus
): OrderStatusModel | null => {
  switch (orderStatus) {
    case OrderStatus.CREATED:
      return {
        idOrderStatus: 1,
        value: "CREATED",
      };

    case OrderStatus.IN_TRANSIT:
      return {
        idOrderStatus: 2,
        value: "IN TRANSIT",
      };

    case OrderStatus.DELIVERED:
      return {
        idOrderStatus: 3,
        value: "DELIVERED",
      };

    default:
      return null;
  }
};
