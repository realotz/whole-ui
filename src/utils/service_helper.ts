//antd pro-table list格式转换
export const listHelper = (servcieCall: any) => {
  return async (params: UsersV1.MemberListOption & {
    pageSize?: number;
    current?: number;
    keyword?: string;
    page_size?: number;
    page?: number;
  }, sort: any, filter: any) => {
    params.page_size = params.pageSize
    delete (params.pageSize)
    params.page = params.current
    delete (params.current)
    console.log("params:", params)
    console.log("sort:", sort)
    console.log("filter:", filter)
    const res = await servcieCall(params)
    return {
      data: res.list,
    }
  }
}