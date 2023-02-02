import { toastService } from "@/services/toast/toastService";
import { UpdatePasswordDetails } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const updatePassword = async (details: UpdatePasswordDetails) => {
  try {
    const response = await userService.updatePassword(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdatePassword = () => {
  return useMutation(updatePassword, {
    onSuccess: async () => {
      toastService.show({
        title: "Success",
        description: "Successfully updated your password",
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
