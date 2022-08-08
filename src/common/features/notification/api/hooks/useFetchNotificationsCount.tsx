import { useQuery } from "react-query";

import { fetchNotificationsCount } from "../queries";

import { FETCH_NOTIFICATIONS_COUNT } from "../queries/constants";

const useFetchNotificationsCount = (idUser: number): any => {
  return useQuery(FETCH_NOTIFICATIONS_COUNT, fetchNotificationsCount(idUser), {
    enabled: false,
  });
};

export default useFetchNotificationsCount;
