import React from "react";

import { Icon } from "@components";

import { declassify } from "@utils/common";

import styles from "./card.module.scss";

interface CardProps {
  className?: string;
  children: any;
  withCheckIcon?: boolean;
  isSelected?: boolean;
  onClick?: any;
}

const Card = ({
  className,
  children,
  withCheckIcon = true,
  isSelected = false,
  onClick,
}: CardProps) => {
  return (
    <div
      className={`${styles.card} ${className} bg_white relative`}
      {...(onClick && { onClick: onClick })}
    >
      <span
        className={declassify(`absolute left-2 top-3 text-white`, {
          visible: isSelected && withCheckIcon,
          invisible: !isSelected || !withCheckIcon,
        })}
      >
        <Icon className="bg_primary rounded-full p-1" icon="las la-check" />
      </span>
      {children}
    </div>
  );
};

export default Card;
