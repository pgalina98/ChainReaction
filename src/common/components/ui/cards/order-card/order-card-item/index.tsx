import React, { useEffect, useState } from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { OrderProduct } from "@models/order/order-product.model";

import { declassify } from "@utils/common";
import { formatNumberToCurrency } from "@utils/currency";

import { ColorPickerIcon } from "common/components/ui/icons";

import styles from "./order-card-item.module.scss";

interface OrderCardItemProps {
  className?: string;
  orderedProduct?: OrderProduct;
}

const OrderCardItem = ({ className, orderedProduct }: OrderCardItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && !isLoading) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
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
        <div className="flex items-center">
          <motion.div className={styles.avatar} layout>
            {orderedProduct?.product?.imagePath && (
              <Image
                src={orderedProduct?.product?.imagePath}
                alt="Product"
                width={35}
                height={20}
                priority
              />
            )}
          </motion.div>
          <div className="ml-4 text-gray-600 text-xl font-medium">{`${orderedProduct?.product?.name} ${orderedProduct?.product?.model}`}</div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isLoading ? (
                <React.Fragment>
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
                </React.Fragment>
              ) : (
                <div className="text-gray-600 mt-2">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Color:
                    </div>
                    <ColorPickerIcon
                      className="border-2 border-gray-300 ml-2"
                      color={orderedProduct?.product?.color?.value!}
                      size="h-6 w-6"
                      isAvailable={false}
                    />
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <div className="font-medium">Price:</div>
                    <div className="ml-2">
                      {formatNumberToCurrency(orderedProduct?.product?.price!)}
                    </div>
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <div className="font-medium">Quantity:</div>
                    <div className="ml-2">{orderedProduct?.quantity}</div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
    </div>
  );
};

export default OrderCardItem;
