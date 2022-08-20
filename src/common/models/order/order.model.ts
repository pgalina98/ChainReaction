import { DeliveryType } from "@enums/delivery-type";

import { CartItem } from "@features/cart/cart-slice";

import Address, { createEmptyAddressObject } from "./address.model";

export default interface OrderForm {
  idUser: number;
  products: CartItem[];
  buyer: string;
  phoneNumber: string;
  deliveryType: DeliveryType;
  deliveryAddress: Address;
}

export const createEmptyOrderFormObject = (): OrderForm => {
  return {
    idUser: null as any,
    products: [],
    buyer: null as any,
    phoneNumber: null as any,
    deliveryType: null as any,
    deliveryAddress: createEmptyAddressObject(),
  };
};