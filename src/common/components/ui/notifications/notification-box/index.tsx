import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { motion } from "framer-motion";

import { RootState } from "@store/index";

import { AlertType } from "@enums/alert-type";
import { ToastType } from "@enums/toast-type";

import Notification from "@models/notification/notification.model";

import { alert } from "@constants/alert";
import { messages } from "@constants/messages";

import { declassify, isEmpty, toString } from "@utils/common";

import { Icon, NotificationItem, Loader, Alert, Toast } from "@components";
import { useToast } from "@components/hooks/useToast";

import { useFadeInOutRightVariants } from "@animations";

import useFetchNotifications from "@features/notification/api/hooks/useFetchNotifications";
import useDeleteNotificationsByIdUser from "@features/notification/api/hooks/useDeleteNotificationsByIdUser";

import styles from "./notification-box.module.scss";
import useDeleteNotificationById from "@features/notification/api/hooks/useDeleteNotificationById";

interface NotificationBoxProps extends StateProps {
  className?: string;
  isOpen: boolean;
  toggleNotificationBox: any;
}

export const NotificationBox = ({
  className,
  isOpen,
  toggleNotificationBox,
  authentication,
}: NotificationBoxProps) => {
  const [isShown, setIsShown] = useToast({ duration: 4000 });

  const [loggedUserNotifications, setLoggedUserNotifications] =
    useState<Notification[]>();

  const { isLoading, isError, isSuccess, data, error, refetch } =
    useFetchNotifications(authentication?.id!);
  const {
    isLoading: isDeletingAll,
    isError: isDeletingAllError,
    isSuccess: isDeletingAllSuccess,
    error: deletingAllError,
    mutate: deleteAll,
  } = useDeleteNotificationsByIdUser(authentication?.id!);
  const {
    isLoading: isDeleting,
    isError: isDeletingError,
    isSuccess: isDeletingSuccess,
    error: deletingError,
    mutate: deleteSingle,
  } = useDeleteNotificationById();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setLoggedUserNotifications(data?.data);
  }, [data]);

  useEffect(() => {
    setIsShown(isError || isDeletingAllError);
  }, [isError, isDeletingAllError, isDeleting]);

  useEffect(() => {
    refetch();
  }, [isDeletingAllSuccess, isDeletingSuccess]);

  const hasAnyError = (): boolean => {
    return isError || isDeletingError || isDeletingAllError;
  };

  const onDeleteAllButtonClick = (): void => {
    deleteAll();
  };

  const onDeleteSingleButtonClick = (idNotification: number): void => {
    deleteSingle(idNotification);
  };

  return (
    <motion.div
      key={toString(isOpen)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={useFadeInOutRightVariants({ duration: 0.3 })}
      className={declassify(
        `${className} ${styles.notification_container} w-7/12 bg_primary z-10 right-0 top-0`,
        { visible: isOpen },
        { invisible: !isOpen }
      )}
    >
      {hasAnyError() && (
        <Toast
          type={ToastType.DANGER}
          message={
            error?.response.data?.message ||
            deletingError?.response?.data.message ||
            deletingAllError?.response?.data.message ||
            messages.INTERNAL_SERVER_ERROR
          }
          isShown={isShown}
          hideToast={() => setIsShown(false)}
        />
      )}
      <span className="w-full h-20 pl-3 pr-4 flex items-center justify-between">
        <Icon
          className="text-2xl cursor-pointer"
          icon="las la-times"
          onClick={() => toggleNotificationBox(false)}
        />
        <div className="flex items-center normal-case bg_white text-black hover:bg-red-400 hover:text-white rounded-lg pl-4 pr-4 cursor-pointer">
          <div className="mr-4" onClick={onDeleteAllButtonClick}>
            Clear all
          </div>
          <Icon icon="las la-dumpster" className="text-2xl" />
        </div>
      </span>
      <hr className="border-1 w-screen text-white bg_white" />
      <div
        className={`${styles.notification_items_container} mt-4 w-full p-4 pt-2 pb-2 normal-case overflow-y-auto`}
      >
        {isLoading || (isDeleting && <Loader withLabel={false} />)}
        {isEmpty(loggedUserNotifications) && (
          <Alert
            type={AlertType.INFO}
            accentBorderPosition="left"
            text={alert.NO_NOTIFICATIONS_YET}
          />
        )}
        {loggedUserNotifications?.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            onDeleteSingleButtonClick={onDeleteSingleButtonClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

const mapStateToProps = ({ authentication }: RootState) => ({
  authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(NotificationBox);
