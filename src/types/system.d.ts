namespace System {
  export interface UserSearchParam {
    name: string
    realname: string
    password: string
    cellphone: number | undefined
    enable: number
    createAt: string[]
  }

  export interface PaginationParam {
    offset: number
    size: number
    totalCount: number
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
