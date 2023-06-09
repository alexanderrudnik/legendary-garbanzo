import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { toastService } from "@/services/toast/toastService";
import { requestService } from "@/services/request/requestService";
import { IRequest } from "@/services/request/types";
import { Workspace } from "@/services/workspace/types";
import { useMutation } from "react-query";

const createRequest = async (details: IRequest) => {
  try {
    const response = await requestService.createRequest(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateRequest = () => {
  return useMutation(createRequest, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old ? { ...old, requests: [...old.requests, data] } : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.REQUESTS,
        (old) => (old ? [...old, data] : [])
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
