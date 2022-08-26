import React from "react";

import { motion, AnimateSharedLayout } from "framer-motion";

import { Order } from "@models/order/order.model";
import DeliveryType from "@models/order/delivery-type.model";
import { DeliveryType as DeliveryTypeEnum } from "@enums/delivery-type";

import { DeliveryInProgress, Pill, Icon } from "@components";

import { formatNumberToCurrency } from "@utils/currency";

import styles from "./order-card.module.scss";

interface OrderCardProps {
  className?: string;
  children: React.ReactNode;
  order: Order;
}

const OrderCard = ({ className, children, order }: OrderCardProps) => {
  const determineIcon = (deliveryType: DeliveryType) => {
    if (deliveryType.idDeliveryType === DeliveryTypeEnum.DHL_DELIVERY) {
      return "lab la-dhl";
    } else if (
      deliveryType.idDeliveryType === DeliveryTypeEnum.FED_EX_DELIVERY
    ) {
      return "lab la-fedex";
    } else {
      return "las la-warehouse text-2xl";
    }
  };

  return (
    <AnimateSharedLayout>
      <motion.ul
        layout
        initial={{ borderRadius: 27.5 }}
        className={`${styles.list} ${className} overflow-x-auto relative`}
      >
        <DeliveryInProgress />
        <div className="absolute top-10 right-5 text-gray-600 text-lg font-medium">
          {formatNumberToCurrency(order?.total)}
        </div>
        <div
          className="flex ml-1 items-center justify-between"
          style={{ marginTop: "8px" }}
        >
          <div className="flex flex-col">
            <Icon
              icon={`${determineIcon(
                order?.deliveryType
              )} text-black text-4xl ml-1`}
            />
            <Pill prependIcon="las la-clock mr-1" text="In transit" />
          </div>
          <div className="text-black text-sm text-gray-600 flex justify-center self-end">
            {order?.estimatedDelivery}
          </div>
        </div>
        {children}
      </motion.ul>
    </AnimateSharedLayout>
  );
};

export default OrderCard;
