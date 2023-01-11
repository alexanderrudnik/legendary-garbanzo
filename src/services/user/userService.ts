import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import { InvitedUser, InviteUserDetails, User } from "./types";
import { nanoid } from "nanoid";
import { axiosInstance } from "../base/baseService";

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
    return axiosInstance.get<User>("/me");
  }
}

export const userService = new UserService();
