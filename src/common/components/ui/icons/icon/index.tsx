import React from "react";

import { declassify } from "@utils/common";

interface IconProps {
  className?: string;
  icon: string;
  isDisabled?: boolean;
  onClick?: any;
}

export const Icon = ({
  className,
  icon,
  isDisabled = false,
  onClick,
}: IconProps) => {
  return (
    <i
      className={declassify(`${className} ${icon}`, {
        "cursor-not-allowed": isDisabled,
      })}
      {...(onClick && !isDisabled && { onClick: onClick })}
    />
  );
};

export default Icon;
