import ASRequest from "../../index"

import { IDataType } from "../../types"

// 请求数据列表
export function getPageListData(url: string, queryInfo: any) {
  return ASRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 删除操作
//  url: /users/id
export function deletePageData(url: string) {
  return ASRequest.delete<IDataType>({
    url: url
  })
}
