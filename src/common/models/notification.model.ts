import { Dayjs } from "dayjs";

export default interface Notification {
  notificationTitle: string;
  notificationText: string;
  createdAt: Dayjs;
}
