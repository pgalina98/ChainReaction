import React, { useEffect, useState } from "react";
import { NextPage } from "next";

import { connect } from "react-redux";

import { motion } from "framer-motion";

import { LocalStorageKeys } from "@enums/local-storage-keys";
import { ToastType } from "@enums/toast-type";

import Pagination from "@models/pagination/pagination.model";
import { OrderPage } from "@models/order/order-page.model";

import { RootState } from "@store/index";

import { messages } from "@constants/messages";

import { getValueByKey } from "@utils/local-storage";
import { declassify } from "@utils/common";

import {
  Header,
  Icon,
  LoadingOverlay,
  OrderCard,
  OrderCardItem,
  Pagination as Paginator,
  Toast,
} from "@components";
import { useToast } from "@components/hooks/useToast";
import authenticatedBoundaryRoute from "@components/hoc/route-guards/authenticatedBoundaryRoute";

import { useFadeInOutRightVariants, useFadeInOutVariants } from "@animations";

import useFetchOrdersByIdUser from "@features/order/api/hooks/useFetchOrdersByIdUser";

import styles from "./my-orders.module.scss";

interface MyOrdersProps extends StateProps {}

const MyOrders: NextPage<MyOrdersProps> = ({
  authentication,
}: MyOrdersProps) => {
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [orderPage, setOrderPage] = useState<OrderPage>();
  const [pagination, setPagination] = useState<Pagination>(
    JSON.parse(getValueByKey(LocalStorageKeys.PAGING_SETTINGS)!)
  );

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    mutate: refetch,
  } = useFetchOrdersByIdUser(authentication?.id!);

  useEffect(() => {
    refetch({ pagination });
  }, []);

  useEffect(() => {
    setOrderPage(data?.data);
    console.log("data: ", data?.data);
    setPagination({ ...pagination, totalElements: data?.data?.totalElements });
  }, [data]);

  useEffect(() => {
    setIsShown(isError);
  }, [isError]);

  const onPageChange = (page: number): void => {
    setPagination({ ...pagination, page });
    refetch({ pagination: { ...pagination, page } });
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="h-full">
      <Header animated showMenu backgroundColor="split" />
      {isError && (
        <Toast
          type={ToastType.DANGER}
          message={
            error?.response?.data?.message || messages.INTERNAL_SERVER_ERROR
          }
          isShown={isShown}
          hideToast={() => setIsShown(false)}
        />
      )}
      <div className="h-screen bg_split relative pt-2 pl-8 pr-8 text-white overflow-y-auto overflow-x-auto">
        <div className="flex items-center">
          <div className="text-3xl font-thin mt-2">My orders</div>
          <Icon icon="las la-truck-loading" className="ml-3 text-4xl" />
        </div>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={useFadeInOutRightVariants({
            duration: 0.5,
          })}
          className={declassify(
            `w-full pt-4 pb-36 grid grid-cols-4 gap-4 overflow-auto`
          )}
        >
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
          <OrderCard className="flex space-y-4">
            <OrderCardItem />
            <OrderCardItem />
          </OrderCard>
        </motion.div>
      </div>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={useFadeInOutVariants({ duration: 0.5, delay: 0.25 })}
      >
        {pagination?.totalElements && (
          <Paginator
            className={`${styles.w_full} absolute bottom-3 right-10 pl-6`}
            pagination={pagination}
            onPageChange={onPageChange}
          />
        )}
      </motion.div>
    </div>
  );
};

const mapStateToProps = ({ authentication }: RootState) => ({
  authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default authenticatedBoundaryRoute(connect(mapStateToProps)(MyOrders));
