import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { dateService } from "@/services/date/dateService";
import { toastService } from "@/services/toast/toastService";
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
    select: (data) =>
      data.sort((a, b) =>
        dateService
          .getDate(a.createdAt)
          .isAfter(dateService.getDate(b.createdAt))
          ? -1
          : 1
      ),
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
