export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
  confirmationPassword: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
