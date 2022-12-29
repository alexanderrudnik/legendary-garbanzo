export interface InviteUserDetails {
  email: string;
}

export interface InvitedUser {
  email: string;
  sender: string;
}

export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}
