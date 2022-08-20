import dayjs from "@utils/dayjs";

export const calculateStandardDeliveryArrivalDateRange = (): string => {
  const today = dayjs();

  const from = today.add(20, "days");
  const to = today.add(26, "days");

  return `${dayjs().localeData().weekdays()[from.day()]}, ${
    dayjs().localeData().monthsShort()[from.month()]
  } ${from.date()} - ${dayjs().localeData().weekdays()[to.day()]}, ${
    dayjs().localeData().monthsShort()[to.month()]
  } ${to.date()}`;
};

export const calculateExpressDeliveryArrivalDateRange = (): string => {
  const today = dayjs();

  const from = today.add(7, "days");
  const to = today.add(11, "days");

  return `${dayjs().localeData().weekdays()[from.day()]}, ${
    dayjs().localeData().monthsShort()[from.month()]
  } ${from.date()} - ${dayjs().localeData().weekdays()[to.day()]}, ${
    dayjs().localeData().monthsShort()[to.month()]
  } ${to.date()}`;
};
