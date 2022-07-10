import React from "react";

import { Loader } from "@components";

import { ButtonType } from "@enums/button-type";

interface ButtonProps {
  className?: string;
  label?: string;
  type?: ButtonType;
  onClick: any;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  className,
  label,
  type = ButtonType.PRIMARY,
  onClick,
  isLoading = false,
  isDisabled = false,
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
        return `border-red-500 bg-red-500 ${isButtonDisabled() && "border-red-400 bg-red-400"} ${
          !isButtonDisabled() && "hover:bg-red-600"
        } text-white`;

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
      className={`${className} border rounded-md px-4 py-2 focus:outline-none focus:shadow-outline ${determineClassNames()} ${
        isButtonDisabled() && "cursor-not-allowed flex justify-center"
      }`}
      disabled={isDisabled || isLoading}
      onClick={onClick}
    >
      {!isLoading ? label : <Loader />}
    </button>
  );
};

export default Button;
