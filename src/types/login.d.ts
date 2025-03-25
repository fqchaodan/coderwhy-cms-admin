export interface AccountFormData {
  account: string
  password: string
}

export interface PhoneFormData {
  phone: string
  code: string
}

export interface LoginResponseData extends AccountFormData {
  id: number
  name: string
  token: string | undefined
}
