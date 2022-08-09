import React from "react";

import { Dayjs } from "dayjs";

import { Icon } from "@components";

import { declassify } from "@utils/common";
import { getShortNameOfDay, getShortNameOfMonth } from "@utils/datetime";

interface DatePickerStripeItemProps {
  date: Dayjs;
  isSelected?: boolean;
  onClick?: any;
}

const DatePickerStripeItem = ({
  date,
  isSelected = false,
  onClick,
}: DatePickerStripeItemProps) => {
  return (
    <div
      className={declassify(
        `flex relative group hover:bg-blue-500 hover:shadow-lg rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16`,
        { bg_blue: isSelected }
      )}
      onClick={() => {
        onClick(date);
      }}
    >
      <span
        className={declassify(`absolute -right-2 -top-2`, {
          visible: isSelected,
          invisible: !isSelected,
        })}
      >
        <Icon className="bg_primary rounded-full p-1" icon="las la-check" />
      </span>
      <div className="flex items-center px-4 py-4">
        <div className="text-center">
          <p
            className={declassify(
              `text-gray-900 group-hover:text-gray-100 text-sm transition-all duration-300`,
              { "text-gray-100": isSelected }
            )}
          >
            {" "}
            {getShortNameOfDay(date?.day())}{" "}
          </p>
          <p
            className={declassify(
              `text-gray-900 group-hover:text-gray-100 mt-3 group-hover:font-bold transition-all duration-300`,
              { "text-gray-100 font-bold": isSelected }
            )}
          >
            {" "}
            {date.date() < 10 ? `0${date.date()}` : date.date()}{" "}
          </p>
          <p
            className={declassify(
              `text-gray-900 group-hover:text-gray-100 text-sm transition-all duration-300 leading-3`,
              { "text-gray-100": isSelected }
            )}
          >
            {" "}
            {getShortNameOfMonth(date.month())}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatePickerStripeItem;
