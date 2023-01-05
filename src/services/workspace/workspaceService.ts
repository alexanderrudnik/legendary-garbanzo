import { auth, db } from "@/app/firebase/firebaseConfig";
import { nanoid } from "nanoid";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CreateWorkspaceDetails, Workspace } from "./types";

class WorkspaceService {
  async createWorkspace({ workspace, website }: CreateWorkspaceDetails) {
    if (auth.currentUser) {
      const id = nanoid();

      const dbRef = doc(db, FirestoreEnum.WORKSPACES, auth.currentUser?.uid);

      const data: Workspace = {
        id,
        name: workspace,
        owner: auth.currentUser.uid,
        website,
        requests: [],
        proposals: [],
      };

      const userRef = doc(db, FirestoreEnum.USERS, auth.currentUser.uid);

      await setDoc(userRef, { workspace }, { merge: true });

      return setDoc(dbRef, data);
    }
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
