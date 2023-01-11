import { userService } from "@/services/user/userService";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../models/QueryKeysEnum";
import { queryClient } from "../queryClient/queryClient";

const getMe = async () => {
  try {
    const response = await userService.getMe();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.ME, getMe, {
    enabled: false,
    onError: async () => {
      await queryClient.setQueryData(QueryKeysEnum.ME, () => null);
    },
  });
};
