import { useQuery } from "react-query";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { notificationService } from "@/services/notification/notificationService";
import { userService } from "@/services/user/userService";

const getInvitedUsersByMe = async () => {
  try {
    const response = await userService.getInvitedUsersByMe();

    return response;
  } catch (error) {
    throw error;
  }
};

export const useInvitedUsersByMe = () => {
  return useQuery(QueryKeysEnum.INVITED_USERS_BY_ME, getInvitedUsersByMe, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
