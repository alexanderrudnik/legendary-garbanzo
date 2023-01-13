import { axiosInstance } from "../base/baseService";
import { Proposal } from "./types";

class ProposalService {
  createProposal(proposal: Proposal) {
    return axiosInstance.post<Proposal>("/proposals", proposal);
  }

  getAll() {
    return axiosInstance.get<Proposal[]>("/proposals");
  }
}

export const proposalService = new ProposalService();
