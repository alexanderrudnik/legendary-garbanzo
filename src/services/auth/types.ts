export interface SignInDetails {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpDetails {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ResetPasswordDetails {
  email: string;
}
