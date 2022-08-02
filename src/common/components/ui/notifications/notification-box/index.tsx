import React from "react";

import { motion } from "framer-motion";

import { declassify, toString } from "@utils/common";

import { Icon, NotificationItem } from "@components";

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
        `${className} ${styles.notification_container} w-7/12 bg_primary z-10 right-0 top-0`,
        { visible: isShown },
        { invisible: !isShown }
      )}
    >
      <span className="w-full h-20 pl-3 pr-4 flex items-center justify-between">
        <Icon
          className="text-2xl cursor-pointer"
          icon="las la-times"
          onClick={() => setIsShown(false)}
        />
        <div className="flex items-center normal-case bg_white text-black hover:bg-red-400 hover:text-white rounded-lg pl-4 pr-4 cursor-pointer">
          <div className="mr-4">Clear all</div>
          <Icon icon="las la-dumpster" className="text-2xl" />
        </div>
      </span>
      <hr className="border-1 w-screen text-white bg_white" />
      <div
        className={`${styles.notification_items_container} mt-4 w-full p-4 pt-2 pb-2 normal-case overflow-y-auto`}
      >
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </div>
    </motion.div>
  );
};

export default NotificationBox;
