import { InvitedUser, InviteUserDetails, User } from "./types";
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
}

export const userService = new UserService();
