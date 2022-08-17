import React from "react";

import { motion } from "framer-motion";

import { declassify, toString } from "@utils/common";

import { useFadeInOutBottomVariants } from "@animations";

import { Icon } from "@components";

import { CartState } from "@features/cart/cart-slice";

interface CartSummaryProps {
  className?: string;
  isOpen: boolean;
  toggleCartSummary: any;
  cart: CartState;
}

const CartSummary = ({
  className,
  isOpen,
  toggleCartSummary,
  cart,
}: CartSummaryProps) => {
  return (
    <motion.div
      key={toString(isOpen)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutBottomVariants({ duration: 0.5 })}
      className={declassify(
        `${className} absolute bottom-0 left-0 bg_white rounded-t-3xl w-full`,
        { "h-16": !isOpen }
      )}
    >
      <div className="flex justify-center">
        <div
          className="w-12 bg_black rounded-b-3xl flex justify-center cursor-pointer"
          onClick={() => toggleCartSummary(!isOpen)}
        >
          <Icon
            className="text-2xl mb-1 -mt-1"
            icon={declassify(
              "text-white",
              {
                "las la-angle-down": isOpen,
              },
              {
                "las la-angle-up": !isOpen,
              }
            )}
          />
        </div>
      </div>
      {isOpen ? (
        <div className="p-6 pt-0 pb-4">
          <div className="flex justify-between text-gray-500">
            <div className="text-md font-medium">Subtotal</div>
            <div className="text-xl font-semibold">$310</div>
          </div>
          <div className="flex justify-between text-gray-500 mt-1 pb-2">
            <div className="text-md font-medium">Shipping</div>
            <div className="text-xl font-semibold">$12</div>
          </div>
          <hr className="border-1 text-white bg-gray-600" />
          <div className="flex justify-between text-gray-500 mt-2 pt-2">
            <div className="text-md font-semibold">Total</div>
            <div className="flex items-end">
              <div className="text-sm mb-1 mr-2">USD</div>
              <div className="text-2xl font-semibold">$12</div>
            </div>
          </div>
          <div className="w-full h-10 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center cursor-pointer mt-2 text-md">
            Place order
          </div>
        </div>
      ) : (
        <div className="p-6 pt-0 pb-4">
          <div className="flex justify-between text-gray-500">
            <div className="text-md font-semibold">Total</div>
            <div className="flex items-end">
              <div className="text-sm mb-1 mr-2">USD</div>
              <div className="text-2xl font-semibold">$12</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartSummary;
