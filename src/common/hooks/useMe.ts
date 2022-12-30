import { userService } from "@/services/user/userService";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../models/QueryKeysEnum";

const getMe = async () => {
  try {
    const response = await userService.getMe();

    return response;
  } catch (error) {
    throw error;
  }
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.ME, getMe, {
    enabled: false,
  });
};
