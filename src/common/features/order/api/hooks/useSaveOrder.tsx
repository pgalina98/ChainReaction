import OrderForm from "@models/order/order-form.model";

import { useMutation } from "react-query";

import { saveOrder } from "../queries";

import { SAVE_ORDER } from "../queries/constants";

const useSaveOrder = (): any => {
  return useMutation(SAVE_ORDER, (orderForm: OrderForm): any => {
    return saveOrder(orderForm)();
  });
};

export default useSaveOrder;
