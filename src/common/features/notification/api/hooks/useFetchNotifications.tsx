import { useQuery } from "react-query";

import { fetchNotifications } from "../queries";

import { FETCH_NOTIFICATIONS } from "../queries/constants";

const useFetchNotifications = (idUser: number): any => {
  return useQuery(FETCH_NOTIFICATIONS, fetchNotifications(idUser), {
    enabled: false,
    refetchOnWindowFocus: false,
  });
};

export default useFetchNotifications;
