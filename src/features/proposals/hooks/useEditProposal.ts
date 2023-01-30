import { notificationService } from "@/services/notification/notificationService";
import { IRequest } from "@/services/request/types";
import { useMutation } from "react-query";
import { queryClient } from "@/common/queryClient/queryClient";
import { QueryKeysEnum } from "@/common/models/QueryKeysEnum";
import { Workspace } from "@/services/workspace/types";
import { proposalService } from "@/services/proposal/proposalService";
import { ProposalsInputs } from "../models/ProposalInputs";

const editProposal = async ({
  details,
  id,
}: {
  details: ProposalsInputs;
  id: string;
}) => {
  try {
    const response = await proposalService.editProposal(details, id);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useEditProposal = () => {
  return useMutation(editProposal, {
    onSuccess: async (data) => {
      await queryClient.setQueryData<Workspace | undefined>(
        QueryKeysEnum.WORKSPACE,
        (old) =>
          old
            ? {
                ...old,
                proposals: old.proposals.map((proposal) =>
                  proposal.id === data.id ? data : proposal
                ),
              }
            : undefined
      );

      await queryClient.setQueryData<IRequest[]>(
        QueryKeysEnum.PROPOSALS,
        (old) =>
          old
            ? old.map((proposal) => (proposal.id === data.id ? data : proposal))
            : []
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
