import { Dayjs } from "dayjs";

import dayjs from "@utils/dayjs";

import { APP_LOCAL_DATE_FORMAT } from "@constants/datetime";

export const getCurrentDate = () => {
  return dayjs().format(APP_LOCAL_DATE_FORMAT);
};

export const getCurrentDay = () => {
  return dayjs().day();
};

export const getShortNameOfCurrentDay = () => {
  return dayjs().localeData().weekdaysShort()[getCurrentDay()];
};

export const getShortNameOfDay = (day: number) => {
  return dayjs().localeData().weekdaysShort()[day];
};

export const getCurrentMonth = () => {
  return dayjs().month();
};

export const getShortNameOfCurrentMonth = () => {
  return dayjs().localeData().monthsShort()[getCurrentMonth()];
};

export const getShortNameOfMonth = (month: number) => {
  return dayjs().localeData().monthsShort()[month];
};

export const getLongNameOfMonth = (month: number) => {
  return dayjs().localeData().months()[month];
};

export const getCurrentYear = () => {
  return dayjs().year();
};

export const formatTime = (date: Dayjs, format: string) => {
  return date.format(format);
};
