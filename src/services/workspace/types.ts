import { Proposal } from "../proposal/types";
import { IRequest } from "../request/types";

export interface CreateWorkspaceDetails {
  workspace: string;
  website: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner: string;
  website: string;
  requests: IRequest[];
  proposals: Proposal[];
}

export interface UpdateWorkspaceDetails {
  name: string;
  website: string;
}
