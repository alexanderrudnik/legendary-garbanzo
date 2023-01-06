import { errorMapper } from "@/common/errorMapper/errorMapper";
import { notificationService } from "@/services/notification/notificationService";
import { InviteUserDetails } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";
import { useAllInvitedUsers } from "./useAllInvitedUsers";

const inviteUser = async (details: InviteUserDetails) => {
  try {
    const response = await userService.inviteUser(details);

    return response;
  } catch (error) {
    throw error;
  }
};

export const useInviteUser = () => {
  const { refetch: getAllInvitedUsers } = useAllInvitedUsers();

  return useMutation(inviteUser, {
    onSuccess: async (_, vars) => {
      getAllInvitedUsers();

      notificationService.show({
        title: "Success",
        description: `Successfully invited ${vars.email}`,
        status: "success",
      });
    },

    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
