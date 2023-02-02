import { authService } from "@/services/auth/authService";
import { SignUpDetails } from "@/services/auth/types";
import { toastService } from "@/services/toast/toastService";
import { useMutation } from "react-query";

const signUp = async (details: SignUpDetails) => {
  try {
    const response = await authService.signUp(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSignUp = () => {
  return useMutation(signUp, {
    onError: (error: any) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
