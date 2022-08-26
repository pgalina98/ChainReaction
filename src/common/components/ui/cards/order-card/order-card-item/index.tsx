import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./order-card-item.module.scss";
import { declassify } from "@utils/common";

interface OrderCardItemProps {
  className?: string;
}

const OrderCardItem = ({ className }: OrderCardItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isOpen]);

  return (
    <div className={className}>
      <motion.li
        layout
        initial={{ borderRadius: 10 }}
        className={`${styles.list_item}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div className={styles.avatar} layout />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={declassify(`${styles.row}`, {
                  "animate-pulse": isLoading,
                })}
              />
              <div
                className={declassify(`${styles.row}`, {
                  "animate-pulse": isLoading,
                })}
              />
              <div
                className={declassify(`${styles.row}`, {
                  "animate-pulse": isLoading,
                })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    </div>
  );
};

export default OrderCardItem;
