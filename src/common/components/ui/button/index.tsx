import React from "react";

import { Loader } from "@components";

import { ButtonType } from "@enums/button-type";

import { declassify } from "@utils/common";

interface ButtonProps {
  className?: string;
  label?: string;
  type?: ButtonType;
  rounded?: boolean;
  prependIcon?: string;
  appendIcon?: string;
  iconSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  onClick?: any;
}

const Button = ({
  className,
  label,
  type = ButtonType.PRIMARY,
  rounded = false,
  prependIcon,
  appendIcon,
  iconSize = "text-lg",
  isLoading = false,
  isDisabled = false,
  isHidden = false,
  onClick,
}: ButtonProps) => {
  const isButtonDisabled = (): boolean => {
    return isDisabled || isLoading;
  };

  const determineClassNames = (): string => {
    switch (type) {
      case ButtonType.PRIMARY:
        return `border-blue-500 bg-blue-500 ${
          isButtonDisabled() && "border-blue-400 bg-blue-400"
        } ${!isButtonDisabled() && "hover:bg-blue-600"} text-white`;

      case ButtonType.SUCCESS:
        return `border-green-500 bg-green-500 ${
          isButtonDisabled() && "border-green-400 bg-green-400"
        } ${!isButtonDisabled() && "hover:bg-green-600"} text-white`;

      case ButtonType.DANGER:
        return `border-red-400 bg-red-400 ${
          isButtonDisabled() && "border-red-300 bg-red-300"
        } ${!isButtonDisabled() && "hover:bg-red-500"} text-white`;

      case ButtonType.WARNING:
        return `border-yellow-500 bg-yellow-500 ${
          isButtonDisabled() && "border-yellow-400 bg-yellow-400"
        } ${!isButtonDisabled() && "hover:bg-yellow-600"} text-white`;

      case ButtonType.INFO:
        return `border-teal-500 bg-teal-500 ${
          isButtonDisabled() && "border-teal-400 bg-teal-400"
        } ${!isButtonDisabled() && "hover:bg-teal-600"} text-white`;

      case ButtonType.DARK:
        return `border-gray-700 bg-gray-700 ${
          isButtonDisabled() && "border-gray-500 bg-gray-500"
        } ${!isButtonDisabled() && "hover:bg-gray-800"} text-white`;

      case ButtonType.LIGHT:
        return `border-gray-200 bg-gray-200 ${
          isButtonDisabled() && "border-gray-100 bg-gray-100"
        } ${!isButtonDisabled() && "hover:bg-gray-300"} text-black`;

      default:
        return `border-blue-500 bg-blue-500 ${
          isButtonDisabled() && "border-blue-400 bg-gray-400"
        } ${!isButtonDisabled() && "hover:bg-blue-600"} text-white`;
    }
  };

  return (
    <button
      type="button"
      className={declassify(
        `border px-4 py-2 ${className} rounded-full focus:outline-none focus:shadow-outline ${determineClassNames()}`,
        { "rounded-full": rounded },
        { "rounded-md": !rounded },
        { "cursor-not-allowed": isButtonDisabled() }
      )}
      disabled={isDisabled || isLoading}
      hidden={isHidden}
      onClick={onClick}
    >
      {!isLoading ? (
        !appendIcon && !prependIcon ? (
          <span>{label}</span>
        ) : (
          <span className="flex items-center justify-between">
            {prependIcon && (
              <span className={`${prependIcon} ${iconSize}`}></span>
            )}
            <span>{label}</span>
            {appendIcon && (
              <span className={`${appendIcon} ${iconSize}`}></span>
            )}
          </span>
        )
      ) : (
        <Loader className="mr-2 ml-3" />
      )}
    </button>
  );
};

export default Button;
