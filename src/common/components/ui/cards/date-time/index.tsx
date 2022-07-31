import React from "react";

import { Dayjs } from "dayjs";

import { APP_SHORT_TIME_FORMAT } from "@constants/datetime";

import { formatTime, getLongNameOfMonth } from "@utils/datetime";

interface DateTimeCardProps {
  className?: string;
  date: Dayjs;
  timeslot: Dayjs;
  isSelected?: boolean;
  onClick?: any;
}

const DateTimeCard = ({
  className,
  date,
  timeslot,
  isSelected = false,
  onClick,
}: DateTimeCardProps) => {
  return (
    <div
      className={`${className} w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center font-medium shadow-lg`}
    >
      <div className="block rounded-t overflow-hidden text-center">
        <div className="bg_blue text-white py-1">
          {getLongNameOfMonth(date.month())}
        </div>
        <div className="pt-1 border-l border-r border-white bg_white">
          <span className="text-5xl font-bold leading-tight text-black">
            {date.date() < 10 ? `0${date.date()}` : date.date()}
          </span>
        </div>
        <div className="border-l border-r border-b rounded-b-lg text-center border-white bg_white -pt-2 -mb-1">
          <span className="text-sm text-black">
            {getLongNameOfMonth(date.month())}
          </span>
        </div>
        <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
          <span className="text-xs leading-normal text-black">
            {formatTime(timeslot, APP_SHORT_TIME_FORMAT)} to{" "}
            {formatTime(timeslot.add(1, "hours"), APP_SHORT_TIME_FORMAT)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateTimeCard;
