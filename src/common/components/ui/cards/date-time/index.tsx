import React from "react";

import { declassify } from "@utils/common";

import styles from "./card.module.scss";

interface DateTimeCardProps {
  className?: string;
  isSelected?: boolean;
  onClick?: any;
}

const DateTimeCard = ({
  className,
  isSelected = false,
  onClick,
}: DateTimeCardProps) => {
  return (
    <div className="w-32 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center font-medium shadow-lg">
      <div className="block rounded-t overflow-hidden text-center">
        <div className="bg_blue text-white py-1">March</div>
        <div className="pt-1 border-l border-r border-white bg_white">
          <span className="text-5xl font-bold leading-tight text-black">
            17
          </span>
        </div>
        <div className="border-l border-r border-b rounded-b-lg text-center border-white bg_white -pt-2 -mb-1">
          <span className="text-sm text-black">Sunday</span>
        </div>
        <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
          <span className="text-xs leading-normal text-black">
            8:00 am to 5:00 pm
          </span>
        </div>
      </div>
    </div>
  );
};

export default DateTimeCard;
