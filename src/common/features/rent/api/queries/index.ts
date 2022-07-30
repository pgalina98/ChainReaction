import { Dayjs } from "dayjs";

import axios from "@utils/api";

import { APP_LOCAL_DATE_FORMAT } from "@constants/datetime";

export const fetchAvailableTimeslots = (
  idProduct: string,
  location: string,
  date: Dayjs
) => {
  return async () =>
    await axios.get<string[]>(
      `/rents/${idProduct}?idLocation=${location}&date=${date.format(
        APP_LOCAL_DATE_FORMAT
      )}`
    );
};
