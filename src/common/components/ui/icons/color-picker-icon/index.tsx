import React from "react";

interface ColorPickerIconProps {
  className?: string;
  color: "white" | "gray-light" | "gray-dark" | "black";
  isSelected?: boolean;
  onClick: any;
}

const ColorPickerIcon = ({
  className,
  color,
  isSelected = false,
  onClick,
}: ColorPickerIconProps) => {
  const determineCheckIconColor = (): string => {
    switch (color) {
      case "white":
        return "black";

      case "gray-light":
      case "gray-dark":
      case "black":
        return "white";

      default:
        return "black";
    }
  };
  return (
    <div
      className={`${className} h-8 w-8 rounded-full flex justify-center items-center bg_${color}`}
      onClick={() => onClick(color)}
    >
      {isSelected && <i className={`las la-check text-${determineCheckIconColor()}`} />}
    </div>
  );
};

export default ColorPickerIcon;
