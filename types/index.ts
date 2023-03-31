export type RegisterUserType = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  email: string;
};
