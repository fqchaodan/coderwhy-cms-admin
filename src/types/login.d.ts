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

// 用户信息
export interface Department {
  id: number
  name: string
  parentId?: any
  createAt: string
  updateAt: string
  leader: string
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface UserRoleInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role?: Role
  department?: Department
}

// 菜单权限
export interface MenuChildInfo {
  id: number
  url?: string | null | undefined
  name: string
  sort?: string | null | undefined
  type: number
  parentId: number
  children?: (MenuChildInfo[] | any[] | null)[]
  permission?: string
}

interface MenuInfo {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: MenuChildInfo[]
}
