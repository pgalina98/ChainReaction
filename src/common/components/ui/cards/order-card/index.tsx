import React from "react";

import { motion, AnimateSharedLayout } from "framer-motion";

import { DeliveryInProgress, Pill, Icon } from "@components";

import styles from "./order-card.module.scss";

interface OrderCardProps {
  className?: string;
  children: React.ReactNode;
}

const OrderCard = ({ className, children }: OrderCardProps) => {
  return (
    <AnimateSharedLayout>
      <motion.ul
        layout
        initial={{ borderRadius: 27.5 }}
        className={`${styles.list} ${className} overflow-x-auto`}
      >
        <DeliveryInProgress />
        <div
          className="flex ml-1 items-center justify-between"
          style={{ marginTop: "8px" }}
        >
          <div className="flex flex-col">
            <Icon icon="lab la-fedex text-black text-4xl -mb-2 ml-1" />
            <Pill prependIcon="las la-clock mr-1" text="In transit" />
          </div>
          <div className="text-black text-sm text-gray-600 flex justify-center self-end">
            Jul, 09 Mon - Jul, 20 Tue
          </div>
        </div>
        {children}
      </motion.ul>
    </AnimateSharedLayout>
  );
};

export default OrderCard;
