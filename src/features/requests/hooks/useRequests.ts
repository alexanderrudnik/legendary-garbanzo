import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { notificationService } from "@/services/notification/notificationService";
import { requestService } from "@/services/request/requestService";
import { useQuery } from "react-query";

const getRequests = async () => {
  try {
    const response = await requestService.getAll();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useRequests = () => {
  return useQuery(QueryKeysEnum.REQUESTS, getRequests, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
