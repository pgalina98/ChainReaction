import React from "react";

import styles from "./card.module.scss";

interface CardProps {
  className?: string;
  children: any;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
