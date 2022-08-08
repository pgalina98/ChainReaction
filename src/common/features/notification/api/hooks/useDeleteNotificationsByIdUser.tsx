import { useMutation } from "react-query";

import { deleteNotifications } from "../queries";

import { DELETE_NOTIFICATIONS_BY_ID_USER } from "../queries/constants";

const useDeleteNotificationsByIdUser = (idUser: number): any => {
  return useMutation(
    DELETE_NOTIFICATIONS_BY_ID_USER,
    deleteNotifications(idUser)
  );
};

export default useDeleteNotificationsByIdUser;
