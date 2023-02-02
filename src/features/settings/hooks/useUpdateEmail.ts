import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { toastService } from "@/services/toast/toastService";
import { UpdateEmailDetails, User } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const updateEmail = async (details: UpdateEmailDetails) => {
  try {
    const response = await userService.updateEmail(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateEmail = () => {
  return useMutation(updateEmail, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<User | undefined>(
        QueryKeysEnum.ME,
        (old) => (old ? { ...old, email: data.email } : old)
      );

      toastService.show({
        title: "Success",
        description: "Successfully updated your email",
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
