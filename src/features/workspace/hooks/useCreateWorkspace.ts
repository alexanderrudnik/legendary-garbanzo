import { useMutation } from "react-query";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { notificationService } from "@/services/notification/notificationService";
import { CreateWorkspaceDetails } from "@/services/workspace/types";
import { workspaceService } from "@/services/workspace/workspaceService";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { User } from "@/services/user/types";
import { useWorkspace } from "./useWorkspace";

const createWorkspace = async (details: CreateWorkspaceDetails) => {
  try {
    const response = await workspaceService.createWorkspace(details);

    return response;
  } catch (error) {
    throw error;
  }
};

export const useCreateWorkspace = () => {
  const { refetch: getWorkspace } = useWorkspace();

  return useMutation(createWorkspace, {
    onSuccess: async (_, vars) => {
      getWorkspace();

      await queryClient.setQueryData<User | undefined>(
        QueryKeysEnum.ME,
        (old) =>
          old
            ? {
                ...old,
                workspace: vars.workspace,
              }
            : undefined
      );
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
