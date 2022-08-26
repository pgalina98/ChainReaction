import React from "react";

import { Icon } from "../icons";

interface PillProps {
  className?: string;
  prependIcon?: string;
  text: string;
}

const Pill = ({ className, prependIcon, text }: PillProps) => {
  return (
    <span
      className={`${className} bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800`}
    >
      {prependIcon && <Icon icon={prependIcon} />}
      {text}
    </span>
  );
};

export default Pill;
