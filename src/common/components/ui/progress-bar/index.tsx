import React from "react";

interface ProgressBarProps {
  className?: string;
  withBadge?: boolean;
  value: number;
}

export const ProgressBar = ({ className, withBadge = false, value }: ProgressBarProps) => {
  return (
    <div className={`${className} relative pt-1`}>
      {withBadge && (
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Task in progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">{value}</span>
          </div>
        </div>
      )}
      <div className="overflow-hidden h-2 mt-1 mb-1 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${value}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg_blue"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
