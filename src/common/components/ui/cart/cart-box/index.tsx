import React from "react";

import { connect } from "react-redux";

import { motion } from "framer-motion";

import { RootState } from "@store/index";

import { AlertType } from "@enums/alert-type";

import { alert } from "@constants/alert";

import { declassify, isEmpty, toString } from "@utils/common";

import { Icon, Alert, CartItem } from "@components";

import { useFadeInOutRightVariants } from "@animations";

import styles from "./cart-box.module.scss";

interface NotificationBoxProps extends StateProps {
  className?: string;
  isOpen: boolean;
  toggleCartBox: any;
}

export const NotificationBox = ({
  className,
  isOpen,
  toggleCartBox,
  cart,
}: NotificationBoxProps) => {
  const onDeleteAllButtonClick = (): void => {};

  return (
    <motion.div
      key={toString(isOpen)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutRightVariants({ duration: 0.3 })}
      className={declassify(
        `${className} ${styles.cart_container} w-7/12 bg_primary z-10 right-0 top-0`,
        { visible: isOpen },
        { invisible: !isOpen }
      )}
    >
      <span className="w-full h-20 pl-3 pr-4 flex items-center justify-between">
        <Icon
          className="text-2xl cursor-pointer"
          icon="las la-times"
          onClick={() => toggleCartBox(false)}
        />
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
      </span>
      <hr className="border-1 w-screen text-white bg_white" />
      <div
        className={`${styles.cart_items_container} mt-4 w-full p-4 pt-2 pb-2 normal-case overflow-y-auto`}
      >
        {isEmpty(cart) && (
          <Alert
            type={AlertType.INFO}
            accentBorderPosition="left"
            text={alert.NO_ITEMS_IN_CART_YET}
          />
        )}
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <div className="absolute bottom-0 left-0 bg_white rounded-t-3xl w-full h-6/12">
          <div className="flex justify-center">
            <div className="w-12 bg_black rounded-b-3xl flex justify-center cursor-pointer">
              <Icon
                className="text-2xl mb-1 -mt-1"
                icon="las la-angle-down text-white"
              />
            </div>
          </div>
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
        </div>
      </div>
    </motion.div>
  );
};

const mapStateToProps = ({ cart }: RootState) => ({
  cart,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(NotificationBox);
