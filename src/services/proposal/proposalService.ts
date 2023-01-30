import { ProposalsInputs } from "@/features/proposals/models/ProposalInputs";
import { axiosInstance } from "../base/baseService";
import { Proposal } from "./types";

class ProposalService {
  createProposal(proposal: Proposal) {
    return axiosInstance.post<Proposal>("/proposals", proposal);
  }

  editProposal(details: ProposalsInputs, id: string) {
    return axiosInstance.put<Proposal>(`/proposals/${id}`, details);
  }

  deleteProposal(id: string) {
    return axiosInstance.delete<Proposal>(`/proposals/${id}`);
  }

  getAll() {
    return axiosInstance.get<Proposal[]>("/proposals");
  }
}

export const proposalService = new ProposalService();
