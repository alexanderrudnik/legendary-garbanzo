import { notificationService } from "@/services/notification/notificationService";
import { SendNotificationDetails } from "@/services/notification/types";
import { toastService } from "@/services/toast/toastService";
import { useMutation } from "react-query";

const sendNotification = async (details: SendNotificationDetails) => {
  try {
    const response = await notificationService.sendNotification(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSendNotification = () => {
  return useMutation(sendNotification, {
    onSuccess: () => {
      toastService.show({
        title: "Success",
        description: "Successfully sent a notification",
        status: "success",
      });
    },
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
