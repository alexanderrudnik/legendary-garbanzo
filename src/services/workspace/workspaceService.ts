import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { doc, getDoc } from "firebase/firestore";
import { CreateWorkspaceDetails, Workspace } from "./types";
import { axiosInstance } from "../base/baseService";

class WorkspaceService {
  async createWorkspace({ workspace, website }: CreateWorkspaceDetails) {
    return axiosInstance.post<Workspace>("/workspace", { workspace, website });
  }

  async getWorkspace() {
    if (auth.currentUser) {
      const docRef = doc(db, FirestoreEnum.WORKSPACES, auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as Workspace;
      }
    }
  }
}

export const workspaceService = new WorkspaceService();
