import OrderForm from "@models/order/order.model";

import { useMutation } from "react-query";

import { saveOrder } from "../queries";

import { SAVE_ORDER } from "../queries/constants";

const useSaveOrder = (orderForm: OrderForm): any => {
  return useMutation(SAVE_ORDER, saveOrder(orderForm));
};

export default useSaveOrder;
