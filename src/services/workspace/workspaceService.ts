import { CreateWorkspaceDetails, Workspace } from "./types";
import { axiosInstance } from "../base/baseService";

class WorkspaceService {
  async createWorkspace({ workspace, website }: CreateWorkspaceDetails) {
    return axiosInstance.post<Workspace>("/workspace", { workspace, website });
  }

  async getWorkspace() {
    return axiosInstance.get<Workspace>("/workspace");
  }
}

export const workspaceService = new WorkspaceService();
