import { RouteRecordRaw } from 'vue-router'

export function MapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const reouteFiles = require.context('../router/main', true, /\.ts/)
  reouteFiles.keys().forEach((key) => {
    console.log(key)
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  console.log(allRoutes)

  // 2.根据菜单获取需要的routes

  return routes
}
