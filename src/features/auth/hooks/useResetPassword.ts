import { errorMapper } from "@/common/errorMapper/errorMapper";
import { authService } from "@/services/auth/authService";
import { ResetPasswordDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMutation } from "react-query";

const resetPassword = async (details: ResetPasswordDetails) => {
  try {
    const response = await authService.resetPassword(details);

    return response;
  } catch (error) {
    throw error;
  }
};

export const useResetPassword = () => {
  return useMutation(resetPassword, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
