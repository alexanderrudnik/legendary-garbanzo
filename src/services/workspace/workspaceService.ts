import {
  CreateWorkspaceDetails,
  UpdateWorkspaceDetails,
  Workspace,
} from "./types";
import { axiosInstance } from "../base/baseService";

class WorkspaceService {
  async createWorkspace({ workspace, website }: CreateWorkspaceDetails) {
    return axiosInstance.post<Workspace>("/workspace", { workspace, website });
  }

  async getWorkspace() {
    return axiosInstance.get<Workspace>("/workspace");
  }

  async updateWorkspace(details: UpdateWorkspaceDetails) {
    return axiosInstance.patch("/workspace", details);
  }
}

export const workspaceService = new WorkspaceService();
