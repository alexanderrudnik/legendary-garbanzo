export interface SignInDetails {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface SignUpDetails {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  telegram?: string;
}

export interface ResetPasswordDetails {
  email: string;
}
