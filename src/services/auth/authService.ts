import { auth, db } from "@/app/firebase/firebaseConfig";
import { FirestoreEnum } from "@/common/models/FirestoreEnum";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { User } from "../user/types";
import { ResetPasswordDetails, SignInDetails, SignUpDetails } from "./types";

class AuthService {
  signIn({ email, password, rememberMe }: SignInDetails) {
    if (!rememberMe) {
      setPersistence(auth, browserSessionPersistence);
    }

    return signInWithEmailAndPassword(auth, email, password);
  }

  async signUp({
    email,
    password,
    firstName,
    lastName,
    telegram,
  }: SignUpDetails) {
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
      telegram,
    };

    await setDoc(dbRef, data);

    await sendEmailVerification(response.user);

    await auth.signOut();

    return response;
  }

  signOut() {
    return signOut(auth);
  }

  resetPassword({ email }: ResetPasswordDetails) {
    return sendPasswordResetEmail(auth, email);
  }
}

export const authService = new AuthService();
