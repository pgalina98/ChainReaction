import { useMutation } from "react-query";

import { deleteNotificationById } from "../queries";

import { DELETE_NOTIFICATION_BY_ID } from "../queries/constants";

const useDeleteNotificationById = (): any => {
  return useMutation(
    DELETE_NOTIFICATION_BY_ID,
    (idNotification: number): any => {
      return deleteNotificationById(idNotification)();
    }
  );
};

export default useDeleteNotificationById;
