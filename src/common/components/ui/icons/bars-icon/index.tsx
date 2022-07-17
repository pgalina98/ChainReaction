import React from "react";

import styles from "./bars-icon.module.scss";

interface BarsIconProps {
  className?: string;
}

export const BarsIcon = ({ className }: BarsIconProps) => {
  return (
    <div className={`${className} absolute left-1/2 top-14 transform -translate-x-1/2`}>
      <div className={`${styles.bar_width} ${styles.bar_height} bg_white`} />
      <div className={`${styles.bar_width} ${styles.bar_height} bg_white mt-2`} />
    </div>
  );
};

export default BarsIcon;
