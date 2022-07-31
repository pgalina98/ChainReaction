import React, { useState } from "react";

import dayjs, { Dayjs } from "dayjs";

import { Icon } from "@components";

import DatePickerItem from "./date-picker-item";

interface DatePickerStripeProps {
  className?: string;
  selectedDate: Dayjs;
  setSelectedDate: any;
}

const DatePickerStripe = ({
  className,
  selectedDate,
  setSelectedDate,
}: DatePickerStripeProps) => {
  const [initialDate, setInitialDate] = useState<Dayjs>(dayjs());

  const range = [
    initialDate,
    initialDate.add(1, "days"),
    initialDate.add(2, "days"),
    initialDate.add(3, "days"),
    initialDate.add(4, "days"),
    initialDate.add(5, "days"),
    initialDate.add(6, "days"),
  ];

  const isPreviousButtonDisabled = () => {
    return range[0].isSame(dayjs(), "dates");
  };

  const changeRange = (date: Dayjs) => {
    setInitialDate(date);
  };

  return (
    <div className="flex justify-center">
      <div
        className={`${className} flex bg-white shadow-md justify-center items-center rounded-lg overflow-x-hidden py-4 px-2`}
      >
        <Icon
          className="text-white bg_primary p-2 mr-4 ml-4 rounded-full cursor-pointer hover:scale-105"
          icon="las la-angle-left"
          isDisabled={isPreviousButtonDisabled()}
          onClick={() => changeRange(initialDate.subtract(1, "days"))}
        />
        {range?.map((date, index) => (
          <DatePickerItem
            key={index}
            date={date}
            isSelected={selectedDate.isSame(date, "dates")}
            onClick={setSelectedDate}
          />
        ))}
        <Icon
          className="text-white bg_primary p-2 mr-4 ml-4 rounded-full cursor-pointer hover:scale-105"
          icon="las la-angle-right"
          onClick={() => changeRange(initialDate.add(1, "days"))}
        />
      </div>
    </div>
  );
};

export default DatePickerStripe;
