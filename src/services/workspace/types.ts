export interface CreateWorkspaceDetails {
  workspace: string;
  website?: string;
}

export interface Workspace {
  id: string;
  name: string;
  owner: string;
  website?: string;
  requests: [];
  proposals: [];
}
