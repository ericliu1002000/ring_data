export interface IUserProfile {
  id: string
  name: string
  mobile: string
  avatar: string
  token: string
}

export interface ILoginForm {
  mobile: string
  password: string
}

export interface IRegisterForm extends ILoginForm {
  confirmPassword: string
  verificationCode: string
}
