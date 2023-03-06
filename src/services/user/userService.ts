import {
  InvitedUser,
  InviteUserDetails,
  UpdateEmailDetails,
  UpdateEmailResponse,
  UpdatePasswordDetails,
  UpdatePasswordResponse,
  UpdatePersonalInfoDetails,
  UpdatePersonalInfoResponse,
  User,
} from "./types";
import { axiosInstance } from "../base/baseService";

class UserService {
  inviteUser({ email }: InviteUserDetails) {
    return axiosInstance.post<InvitedUser>("/invite-user", { email });
  }

  async getAllInvitedUsers() {
    return axiosInstance.get<InvitedUser[]>("/invited-users");
  }

  async getMe() {
    return axiosInstance.get<User>("/me");
  }

  async updateEmail({ email }: UpdateEmailDetails) {
    return axiosInstance.post<UpdateEmailResponse>("/update/email", { email });
  }

  async updatePassword({ password }: UpdatePasswordDetails) {
    return axiosInstance.post<UpdatePasswordResponse>("/update/password", {
      password,
    });
  }

  async updatePersonalInfo({
    firstName,
    lastName,
    telegram,
  }: UpdatePersonalInfoDetails) {
    return axiosInstance.post<UpdatePersonalInfoResponse>(
      "/update/personal-info",
      {
        firstName,
        lastName,
        telegram,
      }
    );
  }

  async toggleMailing(isMailingEnabled: boolean) {
    return axiosInstance.post<string>("/toggle-mailing", {
      isMailingEnabled,
    });
  }
}

export const userService = new UserService();
