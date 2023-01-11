import { useMutation } from "react-query";
import { errorMapper } from "@/common/errorMapper/errorMapper";
import { authService } from "@/services/auth/authService";
import { SignInDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMe } from "@/common/hooks/useMe";

const signIn = async (details: SignInDetails) => {
  try {
    const response = await authService.signIn(details);

    return response;
  } catch (error) {
    throw error;
  }
};

export const useSignIn = () => {
  // const { refetch: getMe } = useMe();

  return useMutation(signIn, {
    onSuccess: () => {
      // getMe();
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occurred",
        description: errorMapper(error.message),
        status: "error",
      }),
  });
};
