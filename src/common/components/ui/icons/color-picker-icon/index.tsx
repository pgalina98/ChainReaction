import React from "react";

interface ColorPickerIconProps {
  className?: string;
  color: "WHITE" | "GRAY-LIGHT" | "GRAY-DARK" | "BLACK";
  isSelected?: boolean;
  isAvailable?: boolean;
  onClick: any;
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
    onClick(color);
  };

  return (
    <div
      className={`${className} h-8 w-8 rounded-full flex justify-center items-center bg_${color.toLowerCase()} ${
        !isAvailable && "cursor-not-allowed"
      }`}
      {...(isAvailable && { onClick: onIconClick })}
    >
      {isSelected && <i className={`las la-check text-${determineCheckIconColor()}`} />}
    </div>
  );
};

export default ColorPickerIcon;
