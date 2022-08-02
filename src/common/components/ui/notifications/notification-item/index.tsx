import React from "react";

import Image from "next/image";

interface NotificationItemProps {
  className?: string;
}

const NotificationItem = ({ className }: NotificationItemProps) => {
  return (
    <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/893/893257.png"
            alt="Messages Icon"
            height={24}
            width={24}
          />
          <h3 className="font-semibold text-base text-gray-800 ml-3 uppercase">
            Notification
          </h3>
        </div>
        <p className="text-xs text-gray-600">1 hour ago</p>
      </div>
      <p className="mt-1 text-sm text-black font-thin">
        You have a new message
      </p>
    </div>
  );
};

export default NotificationItem;
