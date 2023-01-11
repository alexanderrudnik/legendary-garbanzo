import { useMutation } from "react-query";
import { authService } from "@/services/auth/authService";
import { SignInDetails } from "@/services/auth/types";
import { notificationService } from "@/services/notification/notificationService";
import { useMe } from "@/common/hooks/useMe";
import { storageService } from "@/services/storage/storageService";
import { StorageEnum } from "@/common/models/StorageEnum";

const signIn = async (details: SignInDetails) => {
  try {
    const response = await authService.signIn(details);

    return response.user;
  } catch (error) {
    throw error;
  }
};

export const useSignIn = () => {
  const { refetch: getMe } = useMe();

  return useMutation(signIn, {
    onSuccess: async (data) => {
      const token = await data.getIdToken();
      storageService.set(StorageEnum.ACCESS_TOKEN, token);
      getMe();
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occurred",
        description: error.message,
        status: "error",
      }),
  });
};
