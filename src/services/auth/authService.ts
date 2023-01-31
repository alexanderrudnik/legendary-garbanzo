import {
  ResetPasswordDetails,
  SignInDetails,
  SignInResponse,
  SignUpDetails,
} from "./types";
import { axiosInstance } from "../base/baseService";

class AuthService {
  signIn({ email, password, rememberMe }: SignInDetails) {
    return axiosInstance.post<SignInResponse>("/login", { email, password });
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
