import { LocalStorageKeys } from "@enums/local-storage-keys";

import { CartItem } from "@features/cart/cart-slice";
import { SHIPPING_COST } from "@features/cart/constants";

import Product from "@models/product/product.model";

import { getValueByKey, setValue } from "./local-storage";

export const addItemToCart = (cartItem: CartItem): void => {
  const cart = JSON.parse(getValueByKey(LocalStorageKeys.CART)!) || [];

  setValue(
    LocalStorageKeys.CART,
    JSON.stringify({ ...cart, items: [...cart?.items, cartItem] })
  );
};

export const removeItemToCart = (product: Product): void => {
  const cart = JSON.parse(getValueByKey(LocalStorageKeys.CART)!) || [];

  setValue(
    LocalStorageKeys.CART,
    JSON.stringify({
      ...cart,
      items: [
        ...cart?.items.filter((item) => item.idProduct !== product.idProduct),
      ],
    })
  );
};

export const updateItemInCart = (cartItem: CartItem): void => {
  const cart = JSON.parse(getValueByKey(LocalStorageKeys.CART)!) || [];

  const itemIndex = cart.items.findIndex(
    (item: CartItem) => item.idProduct === cartItem.idProduct
  );

  cart.items[itemIndex] = cartItem;

  setValue(
    LocalStorageKeys.CART,
    JSON.stringify({
      ...cart,
    })
  );
};

export const calculateSubtotal = (): number => {
  const cart = JSON.parse(getValueByKey(LocalStorageKeys.CART)!) || [];

  return cart?.items?.reduce(
    (accumulator: number, cartItem: CartItem) =>
      accumulator + cartItem.quantity * cartItem.price,
    0
  );
};

export const calculateTotal = (): number => {
  return calculateSubtotal() + SHIPPING_COST;
};

export const createInitCart = (idUser: number) => {
  return { items: [], idUser };
};
