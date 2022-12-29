import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { InvitedUser, InviteUserDetails } from "./types";

class UserService {
  inviteUser({ email }: InviteUserDetails) {
    const dbRef = collection(db, FirestoreEnum.INVITED_EMAILS);
    const data = {
      email,
      sender: auth.currentUser?.uid,
    };

    return addDoc(dbRef, data);
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
}

export const userService = new UserService();
