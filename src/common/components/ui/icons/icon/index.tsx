import React from "react";

import { declassify } from "@utils/common";

interface IconProps {
  className: string;
  isDisabled?: boolean;
  onClick?: any;
}

export const Icon = ({ className, isDisabled = false, onClick }: IconProps) => {
  return (
    <i
      className={declassify(className, { "cursor-not-allowed": isDisabled })}
      {...(onClick && !isDisabled && { onClick: onClick })}
    />
  );
};

export default Icon;
