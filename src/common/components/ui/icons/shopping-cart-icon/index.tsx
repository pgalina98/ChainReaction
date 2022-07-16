import React from "react";

interface ShoppingCardIconProps {
  numberOfItemInCart?: number;
}

const ShoppingCardIcon = ({ numberOfItemInCart = 2 }: ShoppingCardIconProps) => {
  return (
    <div className="relative">
      <span
        className={`${
          numberOfItemInCart === 0 ? "invisible" : "visible"
        } text-white text-sm absolute left-1/2 -top-0 rounded-full bg_blue p-2 pt-0 pb-0`}
      >
        {numberOfItemInCart}
      </span>
      <i className="las la-shopping-bag text-3xl cursor-pointer" />
    </div>
  );
};

export default ShoppingCardIcon;
