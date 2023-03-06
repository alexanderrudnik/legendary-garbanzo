export interface InviteUserDetails {
  email: string;
}

export interface InvitedUser {
  id: string;
  email: string;
  sender: string | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  workspace: string;
  telegram?: string;
  isStaff?: boolean;
  isMailingEnabled: boolean;
}

export interface UpdateEmailDetails {
  email: string;
}

export interface UpdateEmailResponse {
  email: string;
}

export interface UpdatePasswordDetails {
  password: string;
}

export interface UpdatePasswordResponse {}

export interface UpdatePersonalInfoDetails {
  firstName: string;
  lastName: string;
  telegram?: string;
}

export interface UpdatePersonalInfoResponse {
  firstName: string;
  lastName: string;
  telegram?: string;
}
