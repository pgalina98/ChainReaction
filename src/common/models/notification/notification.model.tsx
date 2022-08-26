import { Dayjs } from "dayjs";

export default interface Notification {
  idNotification: number;
  notificationTitle: string;
  notificationText: string;
  createdAt: Dayjs;
}
