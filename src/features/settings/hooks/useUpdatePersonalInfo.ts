import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { notificationService } from "@/services/notification/notificationService";
import { UpdatePersonalInfoDetails, User } from "@/services/user/types";
import { userService } from "@/services/user/userService";
import { useMutation } from "react-query";

const updatePersonalInfo = async (details: UpdatePersonalInfoDetails) => {
  try {
    const response = await userService.updatePersonalInfo(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useUpdatePersonalInfo = () => {
  return useMutation(updatePersonalInfo, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<User | undefined>(
        QueryKeysEnum.ME,
        (old) =>
          old
            ? {
                ...old,
                firstName: data.firstName,
                lastName: data.lastName,
                telegram: data.telegram,
              }
            : old
      );

      notificationService.show({
        title: "Success",
        description: "Successfully updated your email",
        status: "success",
      });
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
