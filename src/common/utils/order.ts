import dayjs from "@utils/dayjs";

import { DeliveryType, getDeliveryType } from "@enums/delivery-type";

export const calculateDeliveryArrivalDateRange = (
  deliveryType: DeliveryType
): string => {
  const today = dayjs();

  const from = today.add(
    getDeliveryType(deliveryType)?.minimumArrivalDays!,
    "days"
  );
  const to = today.add(
    getDeliveryType(deliveryType)?.maximumArrivalDays!,
    "days"
  );

  return `${dayjs().localeData().weekdays()[from.day()]}, ${
    dayjs().localeData().monthsShort()[from.month()]
  } ${from.date()} - ${dayjs().localeData().weekdays()[to.day()]}, ${
    dayjs().localeData().monthsShort()[to.month()]
  } ${to.date()}`;
};
