import React from "react";

interface CheckboxProps {
  className?: string;
  label: string;
  additionalText?: string;
}

const Checkbox = ({ className, label, additionalText }: CheckboxProps) => {
  return (
    <div className={`${className} flex`}>
      <div className="flex items-center h-5">
        <input
          id="checkbox"
          aria-describedby="checkbox-text"
          type="checkbox"
          className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
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
