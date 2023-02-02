import { useQuery } from "react-query";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { toastService } from "@/services/toast/toastService";
import { userService } from "@/services/user/userService";

const getAllInvitedUsers = async () => {
  try {
    const response = await userService.getAllInvitedUsers();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useAllInvitedUsers = () => {
  return useQuery(QueryKeysEnum.INVITED_USERS, getAllInvitedUsers, {
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
