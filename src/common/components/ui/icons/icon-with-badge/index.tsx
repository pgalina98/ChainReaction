import React from "react";

interface ShoppingCardIconProps {
  icon: string;
  badgeNumber?: number;
  onClick?: any;
}

const IconWIthBadge = ({
  icon,
  badgeNumber = 0,
  onClick,
}: ShoppingCardIconProps) => {
  return (
    <div className="relative">
      {badgeNumber !== 0 && (
        <span className="text-white text-sm absolute left-1/2 -top-0 rounded-full bg_blue p-2 pt-0 pb-0">
          {badgeNumber}
        </span>
      )}
      <i
        className={`${icon} text-3xl cursor-pointer`}
        {...(onClick && { onClick: onClick })}
      />
    </div>
  );
};

export default IconWIthBadge;
