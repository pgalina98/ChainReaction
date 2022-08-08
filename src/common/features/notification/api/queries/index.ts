import axios from "@utils/api";

import Notification from "@models/notification.model";

export const fetchNotifications = (idUser: number) => {
  return async () =>
    await axios.get<Notification[]>(`/notifications?idUser=${idUser}`);
};

export const fetchNotificationsCount = (idUser: number) => {
  return async () =>
    await axios.get<number>(`/notifications/count?idUser=${idUser}`);
};
