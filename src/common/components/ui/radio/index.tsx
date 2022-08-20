import React from "react";

interface RadioProps {
  className?: string;
  helper?: string;
  helperText?: string;
  isChecked: boolean;
  onChange: any;
}

const Radio = ({
  className,
  helper,
  helperText,
  isChecked,
  onChange,
}: RadioProps) => {
  return (
    <div className={`${className} flex`}>
      <div className="flex items-center h-5">
        <input
          id="helper-radio"
          aria-describedby="helper-radio-text"
          type="radio"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={isChecked}
          onChange={() => onChange()}
        />
      </div>
      <div className="ml-2 text-sm">
        <label
          htmlFor="helper-radio"
          className="font-medium text-gray-100 dark:text-gray-100"
        >
          {helper}
        </label>
        <p
          id="helper-radio-text"
          className="text-xs font-normal text-gray-400 dark:text-gray-300"
        >
          {helperText}
        </p>
      </div>
    </div>
  );
};

export default Radio;
