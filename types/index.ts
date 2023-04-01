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

export type InputType = {
  placeholder: string;
  onChange: void | string | any;
  type: string;
  label: string;
  error?: boolean;
};

export type ButtonType = {
  onClick: any;
  text: string;
  loading: boolean;
  disabled?: boolean;
};
