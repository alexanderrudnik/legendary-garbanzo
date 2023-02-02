import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { toastService } from "@/services/toast/toastService";
import { InvitedUser, InviteUserDetails } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const inviteUser = async (details: InviteUserDetails) => {
  try {
    const response = await userService.inviteUser(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useInviteUser = () => {
  return useMutation(inviteUser, {
    onSuccess: async (data, vars) => {
      await queryClient.setQueryData<InvitedUser[]>(
        QueryKeysEnum.INVITED_USERS,
        (old) => {
          if (old?.length) {
            return [...old, data];
          }

          return [];
        }
      );

      toastService.show({
        title: "Success",
        description: `Successfully invited ${vars.email}`,
        status: "success",
      });
    },

    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
