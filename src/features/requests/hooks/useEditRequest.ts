import { notificationService } from "@/services/notification/notificationService";
import { requestService } from "@/services/request/requestService";
import { IRequest } from "@/services/request/types";
import { useMutation } from "react-query";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { Workspace } from "@/services/workspace/types";
import { RequestInputs } from "../models/RequestInputs";

const editRequest = async ({
  details,
  id,
}: {
  details: RequestInputs;
  id: string;
}) => {
  try {
    const response = await requestService.editRequest(details, id);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useEditRequest = () => {
  return useMutation(editRequest, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old
            ? {
                ...old,
                requests: old.requests.map((request) =>
                  request.id === data.id ? data : request
                ),
              }
            : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.REQUESTS,
        (old) =>
          old
            ? old.map((request) => (request.id === data.id ? data : request))
            : []
      );
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
