import { Dayjs } from "dayjs";

import { formatTimeArray } from "@utils/datetime";
import axios from "@utils/api";

import { APP_LOCAL_DATE_FORMAT, APP_TIME_FORMAT } from "@constants/datetime";
import RentForm from "@models/rent/rent.model";

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
  return async () =>
    await axios.post<void>("/rents", {
      ...rentForm,
      timeslots: formatTimeArray(rentForm.timeslots, APP_TIME_FORMAT),
    });
};

export const fetchRentLocations = () => {
  return async () => await axios.get<string[]>("/rents/available-locations");
};
