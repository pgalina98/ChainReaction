import { Dayjs } from "dayjs";

import axios from "@utils/api";

import { APP_LOCAL_DATE_FORMAT } from "@constants/datetime";
import RentForm from "@models/rent.model";

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

export const saveRent = (rentForm: RentForm) => {
  return async () => await axios.post<void>("/rents", rentForm);
};
