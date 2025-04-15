import hyRequest from '@/service'

// 获取角色列表
export const getRoleListApi = async () => {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取部门列表
export const getDepartmentListApi = async () => {
  return hyRequest.post({
    url: '/department/list'
  })
}

// 获取用户列表
export const getUserListApi: ({ offset, size }: System.PaginationParam) => Promise<any> = ({
  offset = 1,
  size = 10,
  enable = '',
  cellphone = '',
  name = '',
  realname = '',
  createAt = null
}: System.PaginationParam) => {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: (offset - 1) * size,
      size,
      enable,
      cellphone,
      name,
      realname,
      createAt
    }
  })
}

// 删除用户
export const deletleteUserApi: (id: number) => Promise<any> = (id: number) => {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 新增用户
export const addUserApi = (data: System.UserSearchParam) => {
  return hyRequest.post({
    url: '/users',
    data
  })
}
