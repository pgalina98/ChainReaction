import axios from "@utils/api";

import OrderForm from "@models/order/order.model";

export const saveOrder = (orderForm: OrderForm) => {
  return async () => await axios.post<void>("/orders", orderForm);
};
