import { useMutation } from "react-query";
import { toastService } from "@/services/toast/toastService";
import { CreateWorkspaceDetails, Workspace } from "@/services/workspace/types";
import { workspaceService } from "@/services/workspace/workspaceService";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { User } from "@/services/user/types";

const createWorkspace = async (details: CreateWorkspaceDetails) => {
  try {
    const response = await workspaceService.createWorkspace(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateWorkspace = () => {
  return useMutation(createWorkspace, {
    onSuccess: async (workspace, vars) => {
      await queryClient.setQueryData<Workspace>(
        QueryKeysEnum.WORKSPACE,
        () => workspace
      );

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
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
