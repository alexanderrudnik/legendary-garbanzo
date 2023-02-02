import { useMutation } from "react-query";
import { authService } from "@/services/auth/authService";
import { SignInDetails } from "@/services/auth/types";
import { toastService } from "@/services/toast/toastService";
import { useMe } from "@/common/hooks/useMe";
import { storageService } from "@/services/storage/storageService";
import { StorageEnum } from "@/common/models/StorageEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";

const signIn = async (details: SignInDetails) => {
  try {
    const response = await authService.signIn(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSignIn = () => {
  const { refetch: getMe } = useMe();

  return useMutation(signIn, {
    onSuccess: async (data) => {
      storageService.set(StorageEnum.ACCESS_TOKEN, data.accessToken);
      await queryClient.setQueryData(QueryKeysEnum.ME, () => undefined);
      getMe();
    },
    onError: (error: Error) =>
      toastService.show({
        title: "An error occurred",
        description: error.message,
        status: "error",
      }),
  });
};
