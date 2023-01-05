import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "../user/types";
import { SignInDetails, SignUpDetails } from "./types";

class AuthService {
  signIn({ email, password }: SignInDetails) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async signUp({ email, password, firstName, lastName }: SignUpDetails) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const dbRef = doc(db, FirestoreEnum.USERS, response.user.uid);

    const data: User = {
      id: response.user.uid,
      email,
      firstName,
      lastName,
      workspace: "",
    };

    await setDoc(dbRef, data);

    await sendEmailVerification(response.user);

    await auth.signOut();

    return response;
  }

  signOut() {
    return signOut(auth);
  }
}

export const authService = new AuthService();
