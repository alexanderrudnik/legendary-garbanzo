import { errorMapper } from "@/common/errorMapper/errorMapper";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { notificationService } from "@/services/notification/notificationService";
import { workspaceService } from "@/services/workspace/workspaceService";
import { useQuery } from "react-query";

const getWorkspace = async () => {
  try {
    const response = await workspaceService.getWorkspace();

    return response;
  } catch (error) {
    throw error;
  }
};

export const useWorkspace = () => {
  return useQuery(QueryKeysEnum.WORKSPACE, getWorkspace, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
