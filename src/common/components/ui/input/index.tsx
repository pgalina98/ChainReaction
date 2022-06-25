import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  prependIcon?: string;
  appendIcon?: string;
  isDisabled?: boolean;
}

const Input = ({
  label,
  placeholder,
  prependIcon,
  appendIcon,
  isDisabled = false,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor="inputField"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {prependIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <i className={`lar ${prependIcon}`} />
            </span>
          </div>
        )}
        <input
          id="inputField"
          type="text"
          className={`focus:ring-gray-500 focus:border-gray-500 block w-full ${
            prependIcon && "pl-7"
          } pr-12 sm:text-sm border-gray-300 rounded-md`}
          placeholder={placeholder || ""}
          disabled={isDisabled}
        />
        {prependIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">
              <i className={`lar ${appendIcon}`} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
