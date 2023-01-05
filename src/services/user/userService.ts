import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { InvitedUser, InviteUserDetails, User } from "./types";
import { nanoid } from "nanoid";

class UserService {
  inviteUser({ email }: InviteUserDetails) {
    const id = nanoid();

    const dbRef = doc(db, FirestoreEnum.INVITED_EMAILS, id);

    const data: InvitedUser = {
      id,
      email,
      sender: auth.currentUser?.uid ?? null,
    };

    return setDoc(dbRef, data);
  }

  async getInvitedUsersByMe() {
    const array: InvitedUser[] = [];

    const q = query(collection(db, FirestoreEnum.INVITED_EMAILS));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const item = doc.data() as InvitedUser;
      array.push(item);
    });

    return array.filter((user) => user.sender === auth.currentUser?.uid);
  }

  async getAllInvitedUsers() {
    const array: InvitedUser[] = [];

    const q = query(collection(db, FirestoreEnum.INVITED_EMAILS));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const item = doc.data() as InvitedUser;
      array.push(item);
    });

    return array;
  }

  async getMe() {
    if (auth.currentUser) {
      const docRef = doc(db, FirestoreEnum.USERS, auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as User;
      }
    }
  }
}

export const userService = new UserService();
