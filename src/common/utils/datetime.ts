import { Dayjs } from "dayjs";

import dayjs from "@utils/dayjs";

import { APP_LOCAL_DATE_FORMAT, APP_TIME_FORMAT } from "@constants/datetime";

export const getCurrentDate = (): string => {
  return dayjs().format(APP_LOCAL_DATE_FORMAT);
};

export const getCurrentDay = (): number => {
  return dayjs().day();
};

export const getShortNameOfCurrentDay = (): string => {
  return dayjs().localeData().weekdaysShort()[getCurrentDay()];
};

export const getShortNameOfDay = (day: number): string => {
  return dayjs().localeData().weekdaysShort()[day];
};

export const getCurrentMonth = (): number => {
  return dayjs().month();
};

export const getShortNameOfCurrentMonth = (): string => {
  return dayjs().localeData().monthsShort()[getCurrentMonth()];
};

export const getShortNameOfMonth = (month: number): string => {
  return dayjs().localeData().monthsShort()[month];
};

export const getLongNameOfMonth = (month: number): string => {
  return dayjs().localeData().months()[month];
};

export const getCurrentYear = (): number => {
  return dayjs().year();
};

export const formatTime = (date: Dayjs, format: string): string => {
  return date.format(format);
};

export const formatTimeArray = (dates: Dayjs[], format: string): string[] => {
  return dates.map((date) => formatTime(date, format));
};
