import { useQuery } from "react-query";

import { fetchRentLocations } from "../queries";

import { FETCH_RENT_LOCATIONS } from "../queries/constants";

const useFetchRentLocations = (): any => {
  return useQuery(FETCH_RENT_LOCATIONS, fetchRentLocations(), {
    enabled: false,
    refetchOnWindowFocus: false,
  });
};

export default useFetchRentLocations;
