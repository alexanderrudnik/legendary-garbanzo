import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { notificationService } from "@/services/notification/notificationService";
import { proposalService } from "@/services/proposal/proposalService";
import { useQuery } from "react-query";

const getProposals = async () => {
  try {
    const response = await proposalService.getAll();

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useProposals = () => {
  return useQuery(QueryKeysEnum.PROPOSALS, getProposals, {
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
