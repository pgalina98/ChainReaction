import React from "react";

import { motion } from "framer-motion";

import { declassify, toString } from "@utils/common";

import { Icon } from "@components";

import { useFadeInOutRightVariants } from "@animations";

import styles from "./notification-box.module.scss";

interface NotificationBoxProps {
  className?: string;
  isShown: boolean;
  setIsShown: any;
}

export const NotificationBox = ({
  className,
  isShown,
  setIsShown,
}: NotificationBoxProps) => {
  return (
    <motion.div
      key={toString(isShown)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutRightVariants({ duration: 0.3 })}
      className={declassify(
        `${className} ${styles.notification_container} w-1/2 bg_primary z-10 right-0 top-0`,
        { visible: isShown },
        { invisible: !isShown }
      )}
    >
      <span>
        <Icon
          className="absolute left-6 top-6 text-2xl cursor-pointer"
          icon="las la-times"
          onClick={() => setIsShown(false)}
        />
      </span>
    </motion.div>
  );
};

export default NotificationBox;
