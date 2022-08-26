import axios from "@utils/api";

import OrderForm from "@models/order/order-form.model";
import Pagination from "@models/pagination/pagination.model";
import { OrderPage } from "@models/order/order-page.model";

export const saveOrder = (orderForm: OrderForm) => {
  return async () => await axios.post<void>("/orders", orderForm);
};

export const fetchOrdersByIdUser = (idUser: number, pagination: Pagination) => {
  return async () =>
    await axios.get<OrderPage>(
      `/orders?page=${pagination.page}&size=${pagination.size}&idUser=${idUser}`
    );
};
