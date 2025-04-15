namespace System {
  export interface UserSearchParam {
    name?: string
    realname?: string
    password?: string
    cellphone?: string | undefined
    enable?: number | string
    createAt?: string[] | null
  }

  export interface PaginationParam extends UserSearchParam {
    offset: number
    size: number
    totalCount: number
    // name?: string
    // realname?: string
    // cellphone?: string | undefined
    // enable?: number | string
    // createAt?: string[]
  }

  export interface AddUserInfo {
    name?: string
    realname?: string
    password?: string
    cellphone?: string | undefined
    roleId?: number | undefined
    departmentId?: number | undefined
  }

  export interface UserInfo {
    id: number
    name: string
    realname: string
    cellphone: number
    enable: number
    departmentId: number
    roleId: number
    createAt: string
    updateAt: string
  }

  export interface UserListApiRes {
    data: {
      list: UserInfo[]
      totalCount: number
    }
    code: number
  }
}
