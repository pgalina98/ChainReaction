import React, { useEffect, useState } from "react";

import { Tooltip } from "@components";

import { ValidationResult } from "common/types/validation-result.type";

import { InptType } from "@enums/input-type";

import { declassify, isNullOrUndefined } from "@utils/common";

import styles from "./input.module.scss";

interface InputProps {
  id: string;
  className?: string;
  label?: string;
  type?: InptType;
  placeholder?: string;
  prependIcon?: string;
  appendIcon?: string;
  appendIconClicable?: boolean;
  onAppendIconClick?: any;
  appendIconActive?: boolean;
  onChange?: any;
  validate?: boolean;
  validator?: any;
  additionalValidationData?: any;
  onValidationStateChange?: any;
  isDisabled?: boolean;
}

const Input = ({
  id,
  className,
  label,
  type = InptType.TEXT,
  placeholder,
  prependIcon,
  appendIcon,
  appendIconClicable = false,
  onAppendIconClick,
  appendIconActive = false,
  onChange,
  validate = false,
  validator,
  additionalValidationData = null,
  onValidationStateChange,
  isDisabled = false,
}: InputProps) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!!onValidationStateChange) {
      onValidationStateChange(isInvalid);
    }
  }, [isInvalid]);

  const onInputFieldChange = (value: string): void => {
    if (validate) {
      let valid: ValidationResult;

      if (additionalValidationData) {
        valid = validator(value, additionalValidationData);
      } else {
        valid = validator(value);
      }

      if (valid.isValid) {
        setIsInvalid(false);
        if (onChange) {
          onChange(value);
        }
      } else {
        setIsInvalid(true);
        setError(valid.error);
      }
    }

    if (!!onChange) {
      onChange(value);
    }
  };

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
          id={`inputField_${id}`}
          type={type === InptType.PASSWORD && !appendIconActive ? "password" : "text"}
          className={declassify(
            `focus:ring-gray-500 focus:border-gray-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${
              styles.input
            } ${isInvalid && styles.invalid_input}`,
            { "pl-10": !isNullOrUndefined(prependIcon) }
          )}
          placeholder={placeholder || ""}
          onChange={({ target: { value } }) => onInputFieldChange(value)}
          disabled={isDisabled}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex">
          {isInvalid && (
            <div className={`flex items-center mt-1 cursor-pointer ${styles.input}`}>
              <Tooltip message={error!}>
                <span className="text-gray-500">
                  <i
                    className={`las la-exclamation-circle ${styles.invalid_icon}`}
                    style={{ fontSize: "1.3rem" }}
                  />
                </span>
              </Tooltip>
            </div>
          )}
          {appendIcon && (
            <div
              className={declassify(
                `flex items-center mt-1 ml-2 ${styles.input}`,
                { "cursor-pointer": appendIconClicable },
                { "pointer-events-none": !appendIconClicable }
              )}
            >
              <span className="text-gray-500" onClick={onAppendIconClick}>
                <i className={appendIcon} style={{ fontSize: "1.3rem" }} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
