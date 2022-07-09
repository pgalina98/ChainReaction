import React, { PropsWithChildren } from "react";

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

const Tooltip = ({ message, children }: PropsWithChildren<TooltipProps>) => {
  return (
    <div className="relative flex flex-col items-center group">
      {children}
      <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex w-64">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md leading-relaxed">
          {message}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
};

export default Tooltip;
