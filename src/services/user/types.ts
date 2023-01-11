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
}
