import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { queryClient } from "@/common/queryClient/queryClient";
import { notificationService } from "@/services/notification/notificationService";
import { proposalService } from "@/services/proposal/proposalService";
import { Proposal } from "@/services/proposal/types";
import { IRequest } from "@/services/request/types";
import { Workspace } from "@/services/workspace/types";
import { useMutation } from "react-query";

const createProposal = async (details: Proposal) => {
  try {
    const response = await proposalService.createProposal(details);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useCreateProposal = () => {
  return useMutation(createProposal, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old ? { ...old, proposals: [...old.proposals, data] } : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.PROPOSALS,
        (old) => (old ? [...old, data] : [])
      );
    },
    onError: (error: Error) =>
      notificationService.show({
        title: "An error occured",
        description: error.message,
        status: "error",
      }),
  });
};
