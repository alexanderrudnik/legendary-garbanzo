import { useMe } from "@/common/hooks/useMe";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { toastService } from "@/services/toast/toastService";
import { User } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const toggleMailing = async (isMailingEnabled: boolean) => {
  try {
    const response = await userService.toggleMailing(isMailingEnabled);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useToggleMailing = () => {
  const { data: me } = useMe();

  return useMutation(toggleMailing, {
    onSuccess: async (data) => {
      toastService.show({
        title: "Success",
        description: data,
        status: "success",
      });

      await queryClient.setQueryData<User | undefined>(
        QueryKeysEnum.ME,
        (old) =>
          old
            ? {
                ...old,
                isMailingEnabled: !me?.isMailingEnabled,
              }
            : undefined
      );
    },
    onError: (error: Error) =>
      toastService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
