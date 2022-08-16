import React from "react";

import { declassify } from "@utils/common";
import { getProductColorId } from "@enums/product-color";

interface ColorPickerIconProps {
  className?: string;
  color: string;
  isSelected?: boolean;
  isAvailable?: boolean;
  onClick?: any;
}

const ColorPickerIcon = ({
  className,
  color,
  isSelected = false,
  isAvailable = true,
  onClick,
}: ColorPickerIconProps) => {
  const determineCheckIconColor = (): string => {
    switch (color) {
      case "WHITE":
        return "black";

      case "GRAY-LIGHT":
      case "GRAY-DARK":
      case "BLACK":
        return "white";

      default:
        return "black";
    }
  };

  const onIconClick = (): void => {
    onClick(getProductColorId(color));
  };

  return (
    <div
      className={declassify(
        `${className} h-8 w-8 rounded-full flex justify-center items-center bg_${color.toLowerCase()}`,
        { "cursor-not-allowed": !isAvailable }
      )}
      {...(isAvailable && { onClick: onIconClick })}
    >
      {isSelected && (
        <i className={`las la-check text-${determineCheckIconColor()}`} />
      )}
    </div>
  );
};

export default ColorPickerIcon;
