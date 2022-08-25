import React from "react";

import { motion, AnimateSharedLayout } from "framer-motion";

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
        {children}
      </motion.ul>
    </AnimateSharedLayout>
  );
};

export default OrderCard;
