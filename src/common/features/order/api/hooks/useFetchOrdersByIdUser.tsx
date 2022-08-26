import { useQuery } from "react-query";

import { fetchOrdersByIdUser } from "../queries";

import { FETCH_ORDERS_BY_ID_USER } from "../queries/constants";

const useFetchOrdersByIdUser = (idUser: number): any => {
  return useQuery(FETCH_ORDERS_BY_ID_USER, (data: any) => {
    return fetchOrdersByIdUser(idUser, data?.pagination)();
  });
};

export default useFetchOrdersByIdUser;
