import { Proposal } from "@/services/proposal/types";

export interface ProposalsInputs extends Omit<Proposal, "startDate"> {
  startDate: string;
}
