import { auth } from "@/app/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ResetPasswordDetails, SignInDetails, SignUpDetails } from "./types";
import { axiosInstance } from "../base/baseService";

class AuthService {
  signIn({ email, password, rememberMe }: SignInDetails) {
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

  resetPassword({ email }: ResetPasswordDetails) {
    return axiosInstance.post("/reset-password", {
      email,
    });
  }
}

export const authService = new AuthService();
