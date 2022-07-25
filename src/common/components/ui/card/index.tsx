import { declassify } from "@utils/common";
import React from "react";

import styles from "./card.module.scss";

interface CardProps {
  className?: string;
  children: any;
  isSelected?: boolean;
  onClick?: any;
}

const Card = ({ className, children, isSelected = false, onClick }: CardProps) => {
  return (
    <div
      className={declassify(
        `${styles.card} ${className}`,
        { "bg-blue-500": isSelected },
        { "bg-white": !isSelected }
      )}
      {...(onClick && { onClick: onClick })}
    >
      {children}
    </div>
  );
};

export default Card;
