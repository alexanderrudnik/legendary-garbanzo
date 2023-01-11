import { auth } from "@/app/firebase/firebaseConfig";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { ResetPasswordDetails, SignInDetails, SignUpDetails } from "./types";
import { axiosInstance } from "../base/baseService";

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
    return axiosInstance.post("/signup", {
      email,
      password,
      firstName,
      lastName,
      telegram,
    });
  }

  signOut() {
    return signOut(auth);
  }

  resetPassword({ email }: ResetPasswordDetails) {
    return sendPasswordResetEmail(auth, email);
  }
}

export const authService = new AuthService();
