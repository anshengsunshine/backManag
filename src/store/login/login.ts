import { Module } from "vuex"

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from "@/api/login/login"

import localCache from "@/utils/cache"
import { MapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus"

import router from "@/router"

import { IAccount } from "@/api/login/type"
import { IRootState } from "../type"
import { ILoginState } from "./type"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      console.log("注册动态路由")
      MapMenusToRoutes(userMenus)
      // userMenus => routes
      const routes = MapMenusToRoutes(userMenus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      console.log("执行accountLoginAction", payload)
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3.请求用户的菜单
      const userMenuResult = await requestUserMenusById(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      // 4. 跳转到首页
      router.push("/main")
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("changeUserMenus", userMenus)
      }
    }
  }
}

export default loginModule
