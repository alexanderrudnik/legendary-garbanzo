import { auth } from "@/app/firebase/firebaseConfig";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { notificationService } from "@/services/notification/notificationService";
import { InvitedUser, InviteUserDetails } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const inviteUser = async (details: InviteUserDetails) => {
  try {
    const response = await userService.inviteUser(details);

    return response;
  } catch (error) {
    throw error;
  }
};

export const useInviteUser = () => {
  return useMutation(inviteUser, {
    onSuccess: async (_, vars) => {
      let newUser: InvitedUser;

      if (auth.currentUser?.uid) {
        newUser = { email: vars.email, sender: auth.currentUser.uid };
      }

      await queryClient.setQueryData<InvitedUser[]>(
        QueryKeysEnum.INVITED_USERS_BY_ME,
        (old) => (old && newUser ? [...old, newUser] : [])
      );

      await queryClient.setQueryData<InvitedUser[]>(
        QueryKeysEnum.INVITED_USERS,
        (old) => (old && newUser ? [...old, newUser] : [])
      );

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
