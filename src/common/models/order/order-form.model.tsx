import { DeliveryType } from "@enums/delivery-type";
import { PaymentMethod } from "@enums/payment-method";
import { OrderStatus } from "@enums/order-status";

import {
  createEmptyDiscountCodeObject,
  DiscountCode,
} from "@models/discount-code/discount-code.model";

import { CartItem } from "@features/cart/cart-slice";

import Address, { createEmptyAddressObject } from "./address.model";
import CreditCardDetails, {
  createEmptyCreditCardDetailsObject,
} from "./credit-card-detalis.model";

export default interface OrderForm {
  idUser: number;
  products: CartItem[];
  buyer: string;
  phoneNumber: string;
  deliveryType: DeliveryType;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  creditCardDetails: CreditCardDetails;
  useDiscountCode: boolean;
  discountCode: DiscountCode;
  status: OrderStatus;
  total: number;
}

export const createEmptyOrderFormObject = (): OrderForm => {
  return {
    idUser: null as any,
    products: [],
    buyer: null as any,
    phoneNumber: null as any,
    deliveryType: null as any,
    deliveryAddress: createEmptyAddressObject(),
    paymentMethod: PaymentMethod.CASH,
    creditCardDetails: createEmptyCreditCardDetailsObject(),
    useDiscountCode: true,
    discountCode: createEmptyDiscountCodeObject(),
    status: OrderStatus.CREATED,
    total: null as any,
  };
};
