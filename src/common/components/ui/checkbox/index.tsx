import React from "react";

import { declassify } from "@utils/common";

import styles from "./checkbox.module.scss";

interface CheckboxProps {
  className?: string;
  label?: string;
  additionalText?: string;
  rounded?: boolean;
  isChecked: boolean;
  onChange: any;
}

const Checkbox = ({
  className,
  label,
  additionalText,
  rounded = false,
  isChecked = false,
  onChange,
}: CheckboxProps) => {
  return (
    <div className={`${className} flex rounded-full`}>
      <div className="flex items-center h-5">
        <input
          id="checkbox"
          aria-describedby="checkbox-text"
          type="checkbox"
          className={declassify(
            `w-4 h-4 ${
              rounded && styles.lg_checkbox
            } text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer`,
            { "rounded-full": rounded }
          )}
          checked={isChecked}
          onChange={() => onChange(label)}
        />
      </div>
      <div className="ml-2 text-sm">
        <label
          htmlFor="checkbox"
          className="font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
        <p
          id="checkbox-text"
          className="text-xs font-normal text-gray-500 dark:text-gray-300"
        >
          {additionalText}
        </p>
      </div>
    </div>
  );
};

export default Checkbox;
