import { Dayjs } from "dayjs";

import { useQuery } from "react-query";

import { fetchAvailableTimeslots } from "../queries";

import { FETCH_AVAILABLE_TIMESLOTS } from "../queries/constants";

const useFetchAvailableTimeslots = (
  idProduct: string,
  location: string,
  date: Dayjs
): any => {
  return useQuery(
    FETCH_AVAILABLE_TIMESLOTS,
    fetchAvailableTimeslots(idProduct, location, date),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
};

export default useFetchAvailableTimeslots;
