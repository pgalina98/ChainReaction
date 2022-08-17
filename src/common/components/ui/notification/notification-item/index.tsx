import React from "react";

import Image from "next/image";

import Notification from "@models/notification/notification.model";

import { Icon } from "@components";

import dayjs from "@utils/dayjs";

interface NotificationItemProps {
  className?: string;
  notification: Notification;
  onDeleteSingleButtonClick: any;
}

const NotificationItem = ({
  className,
  notification,
  onDeleteSingleButtonClick,
}: NotificationItemProps) => {
  return (
    <div
      className={`${className} mt-2 px-6 py-4 bg-white rounded-lg shadow w-full relative`}
    >
      <Icon
        className="text-base text-black cursor-pointer absolute right-0 top-0 mr-3 mt-2"
        icon="las la-times"
        onClick={() => onDeleteSingleButtonClick(notification?.idNotification)}
      />
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/893/893257.png"
            alt="Messages Icon"
            height={24}
            width={24}
          />
          <h3 className="font-semibold text-base text-gray-800 ml-3 uppercase">
            {notification.notificationTitle} Notification
          </h3>
        </div>
        <p className="text-xs text-gray-600 mr-4">
          {dayjs(notification?.createdAt).fromNow()}
        </p>
      </div>
      <p className="mt-1 text-sm text-black font-thin">
        {notification?.notificationText}
      </p>
    </div>
  );
};

export default NotificationItem;
