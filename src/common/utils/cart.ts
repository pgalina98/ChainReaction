import { LocalStorageKeys } from "@enums/local-storage-keys";

import { getValueByKey, setValue } from "./local-storage";

export const addItemToCart = (product: any) => {
  const cart = JSON.parse(getValueByKey(LocalStorageKeys.CART)!) || [];

  setValue(
    LocalStorageKeys.CART,
    JSON.stringify({ ...cart, items: [...cart?.items, product] })
  );
};

export const removeItemToCart = (product: any) => {
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

export const createInitCart = (idUser: number) => {
  return { items: [], idUser };
};
