import ASRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return ASRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
