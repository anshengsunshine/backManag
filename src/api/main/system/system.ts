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

// 新建操作
export function createPageData(url: string, newData: any) {
  return ASRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑操作
export function editPageData(url: string, editData: any) {
  return ASRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
