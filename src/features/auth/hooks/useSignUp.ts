import { authService } from "@/services/auth/authService";
import { SignUpDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMutation } from "react-query";

const signUp = async (details: SignUpDetails) => {
  try {
    const response = await authService.signUp(details);

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const useSignUp = () => {
  return useMutation(signUp, {
    onError: (error: any) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
