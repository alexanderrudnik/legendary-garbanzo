import { axiosInstance } from "../base/baseService";
import { SendNotificationDetails } from "./types";

class NotificationService {
  sendNotification({ title, message }: SendNotificationDetails) {
    return axiosInstance.post("/send-notification", { title, message });
  }
}

export const notificationService = new NotificationService();
