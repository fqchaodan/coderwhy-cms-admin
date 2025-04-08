import hyRequest from '@/service'

// 获取用户列表
export const getUserListApi: ({ offset, size }: System.PaginationParam) => Promise<any> = ({
  offset = 1,
  size = 10
}: System.PaginationParam) => {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: (offset - 1) * size,
      size
    }
  })
}
