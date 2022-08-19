import React from "react";

interface BackIconProps {
  className?: string;
  onClick?: any;
}

export const BackIcon = ({ className, onClick }: BackIconProps) => {
  return (
    <div className={className} {...(onClick && { onClick: onClick })}>
      <i
        className={
          "las la-angle-left p-2 text-black bg_white rounded-md hover:scale-105 cursor-pointer"
        }
      />
    </div>
  );
};

export default BackIcon;
