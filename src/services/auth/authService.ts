import { auth } from "@/app/firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { SignInDetails } from "./types";

class AuthService {
  signIn({ email, password }: SignInDetails) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  signOut() {
    return signOut(auth);
  }
}

export const authService = new AuthService();
