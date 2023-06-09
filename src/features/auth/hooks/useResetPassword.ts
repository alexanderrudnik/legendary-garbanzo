import { authService } from "@/services/auth/authService";
import { ResetPasswordDetails } from "@/services/auth/types";
import { toastService } from "@/services/toast/toastService";
import { useMutation } from "react-query";

const resetPassword = async (details: ResetPasswordDetails) => {
  try {
    const response = await authService.resetPassword(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useResetPassword = () => {
  return useMutation(resetPassword, {
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
