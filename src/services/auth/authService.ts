import { auth } from "@/app/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SignInDetails, SignUpDetails } from "./types";

class AuthService {
  signIn({ email, password }: SignInDetails) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  signUp({ email, password }: SignUpDetails) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  signOut() {
    return signOut(auth);
  }
}

export const authService = new AuthService();
