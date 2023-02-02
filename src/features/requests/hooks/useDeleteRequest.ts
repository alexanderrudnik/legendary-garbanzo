import { toastService } from "@/services/toast/toastService";
import { requestService } from "@/services/request/requestService";
import { IRequest } from "@/services/request/types";
import { useMutation } from "react-query";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { Workspace } from "@/services/workspace/types";

const deleteRequest = async (id: string) => {
  try {
    const response = await requestService.deleteRequest(id);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteRequest = () => {
  return useMutation(deleteRequest, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old
            ? {
                ...old,
                requests: old.requests.filter(
                  (request) => request.id !== data.id
                ),
              }
            : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.REQUESTS,
        (old) => (old ? old.filter((request) => request.id !== data.id) : [])
      );
    },
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
