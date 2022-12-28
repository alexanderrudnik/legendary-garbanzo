import { useMutation } from "react-query";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { authService } from "@/services/auth/authService";
import { SignInDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";

const signIn = async (details: SignInDetails) => {
  try {
    const response = await authService.signIn(details);

    return response.user;
  } catch (error) {
    throw error;
  }
};

export const useSignIn = () => {
  return useMutation(signIn, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occurred",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
