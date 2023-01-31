import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { notificationService } from "@/services/notification/notificationService";
import { User } from "@/services/user/types";
import { UpdateWorkspaceDetails, Workspace } from "@/services/workspace/types";
import { workspaceService } from "@/services/workspace/workspaceService";
import { useMutation } from "react-query";

const updateWorkspace = async (details: UpdateWorkspaceDetails) => {
  try {
    const response = await workspaceService.updateWorkspace(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateWorkspace = () => {
  return useMutation(updateWorkspace, {
    onSuccess: async (_, vars) => {
      await queryClient.setQueryData<User | undefined>(
        QueryKeysEnum.ME,
        (old) => (old ? { ...old, workspace: vars.name } : old)
      );

      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old ? { ...old, name: vars.name, website: vars.website } : old
      );

      notificationService.show({
        title: "Success",
        description: "Successfully updated your email",
        status: "success",
      });
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
