import { useQuery } from "react-query";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { notificationService } from "@/services/notification/notificationService";
import { userService } from "@/services/user/userService";

const getAllInvitedUsers = async () => {
  try {
    const response = await userService.getAllInvitedUsers();

    return response;
  } catch (error) {
    throw error;
  }
};

export const useAllInvitedUsers = () => {
  return useQuery(QueryKeysEnum.INVITED_USERS, getAllInvitedUsers, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
