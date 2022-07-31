import React from "react";

interface ShoppingCardIconProps {
  icon: string;
  badgeNumber?: number;
}

const IconWIthBadge = ({ icon, badgeNumber = 0 }: ShoppingCardIconProps) => {
  return (
    <div className="relative">
      {badgeNumber !== 0 && (
        <span className="text-white text-sm absolute left-1/2 -top-0 rounded-full bg_blue p-2 pt-0 pb-0">
          {badgeNumber}
        </span>
      )}
      <i className={`${icon} text-3xl cursor-pointer`} />
    </div>
  );
};

export default IconWIthBadge;
