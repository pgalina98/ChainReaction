import React from "react";

import styles from "./bars-icon.module.scss";

export const BarsIcon = () => {
  return (
    <div className="absolute left-1/2 top-14 transform -translate-x-1/2 cursor-pointer">
      <div className={`${styles.bar_width} ${styles.bar_height} bg_white`} />
      <div className={`${styles.bar_width} ${styles.bar_height} bg_white mt-2`} />
    </div>
  );
};

export default BarsIcon;
