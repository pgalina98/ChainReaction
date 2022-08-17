import React from "react";

import Image from "next/image";

import { ColorPickerIcon, Icon } from "@components";

import styles from "./cart-item.module.scss";

interface CartItemProps {
  className?: string;
}

const CartItem = ({ className }: CartItemProps) => {
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
            <Image
              src="/assets/e-bikes/cowboy-4/cowboy-4-white.png"
              alt="ChainReaction Logo"
              width={85}
              height={47}
              priority
            />
          </div>
          <div className="ml-6">
            <div className="text-lg font-medium">Cowboy 4</div>
            <div className="flex items-center space-x-3 mt-3">
              <Icon
                icon="las la-minus text-black"
                className="p-2 rounded-md bg_blue-lighter cursor-pointer"
              />
              <div className={`${styles.min_w_12} text-xl`}>1</div>
              <Icon
                icon="las la-plus text-black"
                className="p-2 rounded-md bg_blue-lighter cursor-pointer"
              />
            </div>
          </div>
        </div>
        <ColorPickerIcon
          className="border-2 border-gray-300"
          color="WHITE"
          size="h-7 w-7"
          isAvailable={false}
        />
        <div className="text-2xl">1 x $2999</div>
      </div>
      <hr className="border-1 w-full text-white bg_white" />
    </div>
  );
};

export default CartItem;
