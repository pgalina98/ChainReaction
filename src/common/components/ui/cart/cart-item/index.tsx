import React from "react";

import { useDispatch } from "react-redux";

import Image from "next/image";

import { ColorPickerIcon, Icon } from "@components";

import { declassify } from "@utils/common";

import { CartItem, updateItem } from "@features/cart/cart-slice";

import styles from "./cart-item.module.scss";
import { formatNumberToCurrency } from "@utils/currency";

interface CartItemProps {
  className?: string;
  cartItem: CartItem;
}

const CartItem = ({ className, cartItem }: CartItemProps) => {
  const dispatch = useDispatch();

  const onQuantityChangeButtonClick = (cartItem: CartItem): void => {
    dispatch(updateItem(cartItem));
  };

  return (
    <div className="mt-4">
      <div
        className={`${className} w_full h-20 flex items-center justify-between mb-4`}
      >
        <div className="flex">
          <div className="p-2 pt-3 pb-3 rounded-xl bg_white flex items-center relative">
            <div className="absolute rounded-full bg_white text-black font-medium pl-3 pr-3 -top-2 -right-3">
              1
            </div>
            {cartItem?.imagePath && (
              <Image
                src={cartItem?.imagePath}
                alt="Product image"
                width={85}
                height={47}
                priority
              />
            )}
          </div>
          <div className="ml-6">
            <div className="text-lg font-medium">{`${cartItem?.name} ${cartItem?.model}`}</div>
            <div className="flex items-center space-x-3 mt-3">
              <ColorPickerIcon
                className="border-2 border-gray-300"
                color={cartItem?.color?.value!}
                size="h-7 w-7"
                isAvailable={false}
              />
              <Icon
                icon="las la-minus text-black"
                className={declassify(
                  `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                  { "cursor-not-allowed": cartItem?.quantity === 1 }
                )}
                onClick={() => {
                  if (cartItem?.quantity !== 1) {
                    onQuantityChangeButtonClick({
                      ...cartItem,
                      quantity: cartItem?.quantity - 1,
                    });
                  }
                }}
              />
              <div className={`${styles.min_w_12} text-xl`}>
                {cartItem?.quantity}
              </div>
              <Icon
                icon="las la-plus text-black"
                className={declassify(
                  `p-2 rounded-md bg_blue-lighter cursor-pointer`,
                  {
                    "cursor-not-allowed":
                      cartItem?.quantity === cartItem?.availableQuantity,
                  }
                )}
                onClick={() => {
                  if (cartItem?.quantity !== cartItem?.availableQuantity) {
                    onQuantityChangeButtonClick({
                      ...cartItem,
                      quantity: cartItem?.quantity + 1,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="text-2xl">
          {formatNumberToCurrency(cartItem?.quantity * cartItem?.price)}
        </div>
      </div>
      <hr className="border-1 w-full text-white bg_white" />
    </div>
  );
};

export default CartItem;
