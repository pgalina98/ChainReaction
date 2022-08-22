import { LocalStorageKeys } from "@enums/local-storage-keys";

import { CartItem, CartState } from "@features/cart/cart-slice";

import Product from "@models/product/product.model";

import { getValueByKey, setValue } from "./local-storage";

const getCart = (): CartState => {
  return JSON.parse(getValueByKey(LocalStorageKeys.CART)!);
};

export const addItemToCart = (cartItem: CartItem): void => {
  const cart = getCart();

  setValue(
    LocalStorageKeys.CART,
    JSON.stringify({ ...cart, items: [...cart?.items, cartItem] })
  );
};

export const removeItemToCart = (product: Product): void => {
  const cart = getCart();

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
  const cart = getCart();

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

export const removeAllItemsFromCart = (idUser: number) => {
  setValue(LocalStorageKeys.CART, JSON.stringify(createInitCart(idUser)));
};

export const calculateSubtotal = (): number => {
  const cart = getCart();

  return cart?.items?.reduce(
    (accumulator: number, cartItem: CartItem) =>
      accumulator + cartItem.quantity * cartItem.price,
    0
  );
};

export const calculateTotalWithoutDiscount = (shippingCost: number): number => {
  return calculateSubtotal() + shippingCost;
};

export const calculateTotalWithDiscount = (
  shippingCost: number,
  discount: number
): number => {
  return (
    calculateTotalWithoutDiscount(shippingCost) - calculateDiscount(discount)
  );
};

export const calculateDiscount = (discount: number): number => {
  return calculateSubtotal() * (discount / 100);
};

export const getCartItemByIdProduct = (idProduct: number): CartItem | null => {
  const cart = getCart();

  return (
    cart?.items?.find(
      (cartItem: CartItem) => cartItem?.idProduct === idProduct
    ) || null
  );
};

export const isProductInCart = (product: Product): boolean => {
  const cart = getCart();

  return cart?.items?.some(
    (item: CartItem) => item.idProduct === product?.idProduct
  );
};

export const createInitCart = (idUser: number) => {
  return { items: [], idUser };
};
