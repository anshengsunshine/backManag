import ASRequest from "../index"
import { IAccount, IDataType, ILoginResult } from "./type"

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法：/user/1
  UserMenus = "/role/" //用法：/role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return ASRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return ASRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return ASRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false
  })
}
