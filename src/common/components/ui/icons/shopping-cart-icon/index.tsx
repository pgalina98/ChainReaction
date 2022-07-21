import React from "react";

interface ShoppingCardIconProps {
  numberOfItemsInCart?: number;
}

const ShoppingCardIcon = ({ numberOfItemsInCart = 2 }: ShoppingCardIconProps) => {
  return (
    <div className="relative">
      {numberOfItemsInCart !== 0 && (
        <span
          className={`text-white text-sm absolute left-1/2 -top-0 rounded-full bg_blue p-2 pt-0 pb-0`}
        >
          {numberOfItemsInCart}
        </span>
      )}
      <i className="las la-shopping-bag text-3xl cursor-pointer" />
    </div>
  );
};

export default ShoppingCardIcon;
