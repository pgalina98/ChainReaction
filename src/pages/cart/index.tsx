import React from "react";

import { connect, useDispatch } from "react-redux";

import { alert } from "@constants/alert";

import { AlertType } from "@enums/alert-type";

import { motion } from "framer-motion";

import { RootState } from "@store/index";

import { declassify, isEmpty } from "@utils/common";
import { calculateSubtotal, calculateTotal } from "@utils/cart";
import { formatNumberToCurrency } from "@utils/currency";

import { useFadeInOutVariants } from "@animations";

import { Alert, CartItem, ColorPickerIcon, Header, Icon } from "@components";
import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import { clearCart, removeItem } from "@features/cart/cart-slice";
import { SHIPPING_COST } from "@features/cart/constants";

import styles from "./cart.module.scss";

interface CartProps extends StateProps {}

const Cart = ({ authentication, cart }: CartProps) => {
  const dispatch = useDispatch();

  const onDeleteAllButtonClick = (): void => {
    dispatch(clearCart(authentication?.id!));
  };

  const onDeleteSingleButtonClick = (cartItem: any): void => {
    dispatch(removeItem(cartItem));
  };

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      <div className="grid grid-cols-2 text-white">
        <div
          className={`${styles.h_full} bg_primary pt-2 pb-2 pl-8 pr-8 overflow-y-auto`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="text-3xl font-thin mt-2">Shopping cart</div>
              <Icon icon="las la-shopping-cart" className="ml-3 text-4xl" />
            </div>
            <div
              className={declassify(
                "flex items-center normal-case bg_white text-black hover:bg-red-400 hover:text-white rounded-lg pl-4 pr-4 cursor-pointer",
                { invisible: isEmpty(cart) }
              )}
            >
              <div className="mr-4" onClick={onDeleteAllButtonClick}>
                Clear all
              </div>
              <Icon icon="las la-dumpster" className="text-2xl" />
            </div>
          </div>
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={useFadeInOutVariants({ duration: 0.5 })}
          >
            {isEmpty(cart) && (
              <div className="absolute w-screen pr-14">
                <Alert
                  type={AlertType.INFO}
                  accentBorderPosition="left"
                  text={alert.NO_ITEMS_IN_CART_YET}
                />
              </div>
            )}
            {cart?.items.map((cartItem, index) => (
              <CartItem
                key={index}
                cartItem={cartItem}
                onDeleteSingleButtonClick={onDeleteSingleButtonClick}
              />
            ))}
          </motion.div>
        </div>
        <div
          className={`${styles.h_full} bg_brown pl-12 pr-12 pt-8 pb-8 text-white relative`}
        >
          {!isEmpty(cart) && (
            <div className="absolute w-full pr-24 bottom-10">
              <hr className="border-1 text-white bg-gray-600 mb-3" />
              <div className="flex justify-between">
                <div className="text-md font-medium">Subtotal</div>
                <div className="text-xl font-semibold">
                  {formatNumberToCurrency(calculateSubtotal())}
                </div>
              </div>
              <div className="flex justify-between mt-1 pb-2">
                <div className="text-md font-medium">Shipping</div>
                <div className="text-xl font-semibold">
                  {formatNumberToCurrency(SHIPPING_COST)}
                </div>
              </div>
              <hr className="border-1 text-white bg-gray-600" />
              <div className="flex justify-between mt-2 pt-2">
                <div className="text-md font-semibold">Total</div>
                <div className="flex items-end">
                  <div className="text-sm mb-1 mr-2">USD</div>
                  <div className="text-2xl font-semibold">
                    {formatNumberToCurrency(calculateTotal())}
                  </div>
                </div>
              </div>
              <hr className="border-1 text-white bg-gray-600 mt-3" />
              <div className="w-full h-10 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center cursor-pointer mt-6 text-md">
                Procced to checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, cart }: RootState) => ({
  authentication,
  cart,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default authenticatedBoundaryRoute(connect(mapStateToProps)(Cart));
