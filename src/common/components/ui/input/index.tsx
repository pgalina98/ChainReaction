import React from "react";

import { InptType } from "common/types/inputy-type";

import { Tooltip } from "../tooltip";

import styles from "./input.module.scss";

interface InputProps {
  className?: string;
  label?: string;
  type?: InptType;
  placeholder?: string;
  prependIcon?: string;
  appendIcon?: string;
  appendIconClicable?: boolean;
  onAppendIconClick?: any;
  appendIconActive?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  error?: string;
}

const Input = ({
  className,
  label,
  type = InptType.TEXT,
  placeholder,
  prependIcon,
  appendIcon,
  appendIconClicable = false,
  onAppendIconClick,
  appendIconActive = false,
  isDisabled = false,
  isInvalid = false,
  error = "",
}: InputProps) => {
  return (
    <div className={className}>
      <label
        htmlFor={`inputField_${label}`}
        className="block text-sm font-medium text-gray-700 text-lg"
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {prependIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">
              <i className={prependIcon} style={{ fontSize: "1.3rem" }} />
            </span>
          </div>
        )}
        <input
          id={`inputField_${label}`}
          type={
            type === InptType.PASSWORD && !appendIconActive
              ? "password"
              : "text"
          }
          className={`focus:ring-gray-500 focus:border-gray-500 block w-full ${
            prependIcon && "pl-10"
          } pr-12 sm:text-sm border-gray-300 rounded-md ${styles.input} ${
            isInvalid && styles.invalid_input
          }`}
          placeholder={placeholder || ""}
          disabled={isDisabled}
        />
        {appendIcon && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center mt-1 ${
              appendIconClicable ? "cursor-pointer" : "pointer-events-none"
            } ${styles.input}`}
          >
            <span className="text-gray-500" onClick={onAppendIconClick}>
              <i className={appendIcon} style={{ fontSize: "1.3rem" }} />
            </span>
          </div>
        )}
        {isInvalid && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center mt-1 cursor-pointer ${styles.input}`}
          >
            <Tooltip message={error}>
              <span
                className="text-gray-500"
                onClick={() => console.log("abcdef")}
              >
                <i
                  className={`las la-exclamation-circle ${styles.invalid_icon}`}
                  style={{ fontSize: "1.3rem" }}
                />
              </span>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
