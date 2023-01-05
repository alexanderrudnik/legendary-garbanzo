import { errorMapper } from "@/common/errorMapper/errorMapper";
import { authService } from "@/services/auth/authService";
import { SignUpDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMutation } from "react-query";

const signUp = async (details: SignUpDetails) => {
  try {
    const response = await authService.signUp(details);

    return response.user;
  } catch (error) {
    throw error;
  }
};

export const useSignUp = () => {
  return useMutation(signUp, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
