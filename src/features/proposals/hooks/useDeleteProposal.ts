import { notificationService } from "@/services/notification/notificationService";
import { IRequest } from "@/services/request/types";
import { useMutation } from "react-query";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { Workspace } from "@/services/workspace/types";
import { proposalService } from "@/services/proposal/proposalService";

const deleteProposal = async (id: string) => {
  try {
    const response = await proposalService.deleteProposal(id);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteProposal = () => {
  return useMutation(deleteProposal, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old
            ? {
                ...old,
                proposals: old.proposals.filter(
                  (proposal) => proposal.id !== data.id
                ),
              }
            : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.PROPOSALS,
        (old) => (old ? old.filter((proposal) => proposal.id !== data.id) : [])
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
